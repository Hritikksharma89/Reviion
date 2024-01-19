import { Router } from 'express'

import { API_AUTH, API_DOCS, API_USER } from '@/constant/api.constant'
import authRouter from '@/routes/v1/auth.route'
import docsRoute from '@/routes/v1/docs.route'
import userRoute from '@/routes/v1/users.route'

const v1Routes = Router()

v1Routes.use(API_USER, userRoute)
v1Routes.use(API_DOCS, docsRoute)
v1Routes.use(API_AUTH, authRouter)

export default v1Routes
