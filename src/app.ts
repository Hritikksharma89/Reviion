import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'

import { corsOptions } from '@/config/corsConfig'
import { API_ROOT } from '@/constant/api.constant'
import v1Routes from '@/routes/index'

const app: Application = express()

app.use(helmet())

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(compression())

app.use(cookieParser())

app.use(API_ROOT, v1Routes)

export default app
