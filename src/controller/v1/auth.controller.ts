import type { Request, Response } from 'express'
import httpStatus from 'http-status'

import catchAsync from '../../lib/catchAsync'
import { generateAuthTokens } from '../../services/token.services'
import { loginUserWithEmailAndPassword, registerUser } from '../../services/user.services'

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
