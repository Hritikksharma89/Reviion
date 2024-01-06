import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import moment, { Moment } from 'moment'
import type { ObjectId } from 'mongoose'

import { tokenTypes } from '../constant/token.constant'
import { AccessAndRefreshTokens, ITokenDoc } from '../interface/token.interface'
import { IUser } from '../interface/users.interfaces'
import ApiError from '../lib/apiError'
import { Token, Users } from '../models/model'
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

export const generateAuthTokens = async (user: IUser): Promise<AccessAndRefreshTokens> => {
  const accessTokenExpires = moment().add(environment.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes')
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS)

  const refreshTokenExpires = moment().add(environment.JWT_REFRESH_EXPIRATION_DAYS, 'days')
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH)
  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH)

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  }
}

export const verifyToken = async (token: string, type: string): Promise<ITokenDoc> => {
  const payload = jwt.verify(token, environment.JWT_SECRET)
  if (typeof payload.sub !== 'string') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'bad user')
  }
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  })
  if (!tokenDoc) {
    throw new Error('Token not found')
  }
  return tokenDoc
}

export const generateResetPasswordToken = async (email: string): Promise<string> => {
  const user = await Users.findOne({ email })
  if (!user) {
    throw new ApiError(httpStatus.NO_CONTENT, '')
  }
  const expires = moment().add(environment.JWT_RESET_PASSWORD_EXPIRATION_MINUTES, 'minutes')
  const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD)
  await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD)
  return resetPasswordToken
}
