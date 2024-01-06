import httpStatus from 'http-status'

import { tokenTypes } from '../constant/token.constant'
import { IUser } from '../interface/users.interfaces'
import ApiError from '../lib/apiError'
import { Users } from '../models/model'
import { generateAuthTokens, verifyToken } from './token.services'

export const refreshAuth = async (refreshToken: string) => {
  try {
    const refreshTokenDoc = await verifyToken(refreshToken, tokenTypes.REFRESH)
    const _id = refreshTokenDoc.user
    const user = await Users.findById<IUser>(_id)
    if (!user) {
      throw new Error()
    }
    await refreshTokenDoc.deleteOne()
    const tokens = await generateAuthTokens(user)
    return { user, tokens }
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate')
  }
}
