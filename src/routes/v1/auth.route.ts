import { Router } from 'express'

import { login, register } from '../../controller/v1/auth.controller'

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout')
authRouter.post('/refresh-tokens')

export default authRouter
