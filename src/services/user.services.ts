import httpStatus from 'http-status'

import { IUser } from '../interface/users.interfaces'
import ApiError from '../lib/apiError'
import { Users } from '../models/model'

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
