import type { Request, Response } from 'express'
import httpStatus from 'http-status'
import { string } from 'zod'

import { tokenTypes } from '../../constant/token.constant'
import { IUser } from '../../interface/users.interfaces'
import catchAsync from '../../lib/catchAsync'
import { Users } from '../../models/model'
import { refreshAuth } from '../../services/auth.services'
import {
  generateAuthTokens,
  generateResetPasswordToken,
  verifyToken,
} from '../../services/token.services'
import {
  getUserWithEmailAndPassword,
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
  const user = await getUserWithEmailAndPassword(email, password)
  if (user) {
    const tokens = await generateAuthTokens(user)
    res.send({ message: 'User login successful', data: { user, tokens }, error: {} })
  } else {
    res
      .status(httpStatus.NOT_FOUND)
      .send({ message: ' Email and Password is incorrect', data: {}, error: {} })
  }
})

export const logout = catchAsync(async (req: Request, res: Response) => {
  await logoutUser(req.body.refreshToken)
  res
    .status(httpStatus.NO_CONTENT)
    .send({ message: 'User logged out successfully', data: {}, error: {} })
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
  if (typeof req.query['token'] == 'string') {
    const resetDoc = await verifyToken(req.query['token'] as string, tokenTypes.RESET_PASSWORD)
    if (resetDoc && resetDoc.user) {
      const id = resetDoc.user
      const user = await Users.findById<IUser>(id)
      if (user) {
        const data = await resetUserPassword(resetDoc.user, req.body.password)
        res
          .status(httpStatus.NO_CONTENT)
          .send({ message: 'Password reset successful', data, error: {} })
      } else {
        res.status(httpStatus.NOT_FOUND).send({ message: 'User not found', data: {}, error: {} })
      }
    } else {
      res.status(httpStatus.UNAUTHORIZED).send({ message: 'Invalid token', data: {}, error: {} })
    }
  } else {
    res.status(httpStatus.UNAUTHORIZED).send({ message: 'Invalid token', data: {}, error: {} })
  }
})
