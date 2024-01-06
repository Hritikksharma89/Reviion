import { Router } from 'express'

import {
  forgotPassword,
  login,
  logout,
  refreshTokens,
  register,
  resetPassword,
} from '../../controller/v1/auth.controller'

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/refresh-tokens', refreshTokens)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password', resetPassword)

export default authRouter
