import httpStatus from 'http-status'
import { ObjectId } from 'mongoose'

import { tokenTypes } from '../constant/token.constant'
import { IUser, NewCreatedUser, UpdateUserBody } from '../interface/users.interfaces'
import ApiError from '../lib/apiError'
import { Token, Users } from '../models/model'
import { verifyToken } from './token.services'

export const getAllService = async (page?: String, limit?: String) => {
  const skip = (Number(page) - 1) * Number(limit)
  const users = await Users.find<IUser[]>().skip(skip).limit(Number(limit)).sort('desc')
  return users
}

export const getServiceById = async (_id: ObjectId): Promise<IUser | null> => {
  const user = await Users.findById<IUser>(_id)
  return user
}

export const createUserService = async (userBody: NewCreatedUser): Promise<IUser> => {
  if (await Users.findOne({ email: userBody.email })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
  }
  const user = await Users.create<IUser>(userBody)
  return user
}

export const deleteUserByIdService = async (_id: object) => {
  const user = await Users.findByIdAndDelete<IUser>(_id)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
  }
  return user
}

export const updateUserByIdService = async (_id: ObjectId, updateBody: UpdateUserBody) => {
  const user = await Users.findById<IUser>(_id)
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  if (updateBody.email && (await Users.findOne({ email: updateBody.email }))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
  }
  const updatedUser = await Users.findByIdAndUpdate<IUser>(_id, updateBody)
  return updatedUser
}

export const registerUser = async (user: IUser): Promise<IUser> => {
  if (await Users.findOne({ email: user.email })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
  }
  return Users.create(user)
}

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<IUser> => {
  const user = await Users.findOne({ email, password })
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
  }
  return user
}

export const logoutUser = async (refreshToken: string): Promise<void> => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  })
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
  }
  await Token.deleteOne(refreshTokenDoc)
}

export const resetUserPassword = async (
  resetPasswordToken: any,
  newPassword: string,
): Promise<void> => {
  try {
    const resetPasswordTokenDoc = await verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD)
    const _id = resetPasswordTokenDoc.user
    const user = await Users.findById<IUser>(_id)
    if (!user) {
      throw new Error()
    }
    await Users.findByIdAndUpdate(user.id, { password: newPassword })
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD })
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed')
  }
}
