import type { Request, Response } from 'express'
import httpStatus from 'http-status'

import catchAsync from '../../lib/catchAsync'
import { refreshAuth } from '../../services/auth.services'
import { generateAuthTokens, generateResetPasswordToken } from '../../services/token.services'
import {
  loginUserWithEmailAndPassword,
  logoutUser,
  registerUser,
  resetUserPassword,
} from '../../services/user.services'

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await registerUser(req.body)
  const tokens = await generateAuthTokens(user)
  res.status(httpStatus.CREATED).send({ user, tokens })
})

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await loginUserWithEmailAndPassword(email, password)
  const tokens = await generateAuthTokens(user)
  res.send({ user, tokens })
})

export const logout = catchAsync(async (req: Request, res: Response) => {
  await logoutUser(req.body.refreshToken)
  res.status(httpStatus.NO_CONTENT).send()
})

export const refreshTokens = catchAsync(async (req: Request, res: Response) => {
  const userWithTokens = await refreshAuth(req.body.refreshToken)
  res.send({ ...userWithTokens })
})

export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const resetPasswordToken = await generateResetPasswordToken(req.body.email)
  res.status(httpStatus.NO_CONTENT).send(resetPasswordToken)
})

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await resetUserPassword(req.query['token'], req.body.password)
  res.status(httpStatus.NO_CONTENT).send()
})
