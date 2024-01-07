import httpStatus from 'http-status'

import { tokenTypes } from '../constant/token.constant'
import { IUser } from '../interface/users.interfaces'
import ApiError from '../lib/apiError'
import { Token, Users } from '../models/model'
import { verifyToken } from './token.services'

export const getAllService = async (page?: String, limit?: String) => {
  const skip = (Number(page) - 1) * Number(limit)
  const users = await Users.find<IUser[]>().skip(skip).limit(Number(limit)).sort('desc')
  if (!users) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
  }
  return users
}

export const getServiceById = async (_id: String) => {
  const user = await Users.findById<IUser>(_id)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
  }
  return user
}

export const createUserService = async (userBody: IUser) => {
  const user = await Users.create<IUser>(userBody)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
  }
  return user
}

export const deleteUserByIdService = async (_id: String) => {
  const user = await Users.findByIdAndDelete<IUser>(_id)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
  }
  return user
}

export const updateUserByIdService = async (_id: String, payload: IUser) => {
  const user = await Users.findByIdAndUpdate<IUser>(_id, payload)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
  }
  return user
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
