import {
  deleteRefreshToken,
  generateAuthTokens,
  generateResetPasswordToken,
  refreshAuth,
  resetUserPassword,
  verifyToken,
} from '@/services/token.services'
import type { Request, Response } from 'express'

import CryptoFactory from '@/factory/cryptoFactory'
import ResponseFactory from '@/factory/responseFactory'
import { IUser, NewCreatedUser } from '@/interface/users.interfaces'
import ErrorWrapper from '@/middleware/errorWrapper'
import { CreateUser, GetUser, GetUserByEmail } from '@/services/user.services'

export const register = ErrorWrapper(async (req: Request, res: Response) => {
  const { password, email, ...body } = req.body as NewCreatedUser
  if (await GetUserByEmail(email as string)) return ResponseFactory(res).conflict()
  const user = await CreateUser({
    email,
    password: CryptoFactory().encryptedPassword(password as string),
    ...body,
  })
  if (user) {
    const tokens = await generateAuthTokens(user['id'], user['role'])
    return ResponseFactory(res).successCreated({ tokens, user })
  }
})

export const login = ErrorWrapper(async (req: Request, res: Response) => {
  const { email, password }: IUser = req.body
  const user = await GetUser({ email })
  if (!user) return ResponseFactory(res).notFound()
  if (!CryptoFactory().comparePassword(password, user.password))
    return ResponseFactory(res).unauthorized()
  return ResponseFactory(res).successCreated({
    tokens: await generateAuthTokens(user?._id, user?.role),
    user,
  })
})

export const resetPassword = ErrorWrapper(async (req: Request, res: Response) => {
  const user = verifyToken(req.query.token as string)
  if (await GetUser(user.sub))
    return ResponseFactory(res).success(await resetUserPassword(user.sub, req.body.password))
  return ResponseFactory(res).unauthorized()
})

export const logout = ErrorWrapper(async (req: Request, res: Response) =>
  ResponseFactory(res).success(await deleteRefreshToken(req.body.refreshToken)),
)

export const refreshTokens = ErrorWrapper(async (req: Request, res: Response) =>
  ResponseFactory(res).success(await refreshAuth(req.body.refreshToken)),
)

export const forgotPassword = ErrorWrapper(async (req: Request, res: Response) =>
  ResponseFactory(res).success(await generateResetPasswordToken(req.body.email, req.body.role)),
)
