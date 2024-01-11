import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import moment, { Moment } from 'moment'
import type { ObjectId } from 'mongoose'

import { tokenTypes } from '../constant/token.constant'
import { AccessAndRefreshTokens, IToken, ITokenDoc } from '../interface/token.interface'
import { IUser } from '../interface/users.interfaces'
import ApiError from '../lib/apiError'
import { Token, Users } from '../models/model'
import { tokenExpireDays, tokenExpireMin } from '../utils/tokenExpireTime'
import { environment } from '../validation/env.validation'

export const generateToken = (
  userId: ObjectId,
  expires: Moment,
  type: string,
  secret: string = environment.JWT_SECRET,
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  }
  return jwt.sign(payload, secret)
}

export const saveToken = async (
  token: string,
  userId: ObjectId,
  expires: Moment,
  type: string,
  blacklisted: boolean = false,
): Promise<ITokenDoc> => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  })
  return tokenDoc
}

export const generateAuthTokens = async (id: ObjectId): Promise<AccessAndRefreshTokens> => {
  const accessToken = generateToken(id, tokenExpireMin, tokenTypes.ACCESS)
  const refreshToken = generateToken(id, tokenExpireDays, tokenTypes.REFRESH)
  await saveToken(refreshToken, id, tokenExpireDays, tokenTypes.REFRESH)

  return {
    access: {
      token: accessToken,
      expires: tokenExpireMin.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: tokenExpireDays.toDate(),
    },
  }
}

export const findTokenById = async (id: ObjectId, token: string, type: string) => {
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: id,
    blacklisted: false,
  })
  return tokenDoc
}

export const verifyToken = async (token: string, type: string): Promise<string | JwtPayload> => {
  return jwt.verify(token, environment.JWT_SECRET)
}

export const generateResetPasswordToken = async (id: ObjectId): Promise<string> => {
  const resetPasswordToken = generateToken(id, tokenExpireMin, tokenTypes.RESET_PASSWORD)
  await saveToken(resetPasswordToken, id, tokenExpireMin, tokenTypes.RESET_PASSWORD)
  return resetPasswordToken
}
export const deleteRefreshToken = async (refreshTokenDoc: IToken) => {
  const deleteToken = await Token.deleteOne(refreshTokenDoc)
  return deleteToken
}

export const getRefreshTokenDoc = async (refreshToken: string): Promise<ITokenDoc> => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  })
  return refreshTokenDoc
}

export const resetUserPassword = async (userId: any, newPassword: string) => {
  const user = await Users.findByIdAndUpdate(userId, { password: newPassword })
  const token = await Token.deleteMany({ user: userId, type: tokenTypes.RESET_PASSWORD })
  return { user, token }
}

export const refreshAuth = async (refreshTokenDoc: IToken) => {

  const token = await deleteRefreshToken(refreshTokenDoc)
    const tokens = await generateAuthTokens(token.user as ObjectId)
    return { tokens }

}
