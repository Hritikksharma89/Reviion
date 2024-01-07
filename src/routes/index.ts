import { Router } from 'express'

import authRouter from './v1/auth.route'
import docsRoute from './v1/docs.route'
import userRoute from './v1/users.route'

const v1Routes = Router()

v1Routes.use('/users/', userRoute)
v1Routes.use('/docs/', docsRoute)
v1Routes.use('/auth', authRouter)

export default v1Routes
