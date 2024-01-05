import { Router } from 'express'

import authRouter from './v1/auth.route'
import docsRoute from './v1/docs.route'
import onboardingsRoute from './v1/onboardings.route'
import profilesRoute from './v1/profiles.route'
import settingsRoute from './v1/settings.route'
import userRoute from './v1/users.route'

const v1Routes = Router()

v1Routes.use('/users/', userRoute)
v1Routes.use('/docs/', docsRoute)
v1Routes.use('/profiles/', profilesRoute)
v1Routes.use('/settings/', settingsRoute)
v1Routes.use('/onboardings/', onboardingsRoute)
v1Routes.use('/auth', authRouter)

export default v1Routes
