import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'

import { corsOptions } from '@/config/corsConfig'
import { API_ROOT } from '@/constant/api.constant'
import v1Routes from '@/routes/index'

/**
 * Creates an Express application instance.
 */
const app: Application = express()

/**
 * Sets HTTP headers to help secure Express app.
 */
app.use(helmet())

/**
 * Enables CORS for the Express app using the corsOptions config.
 */
app.use(cors(corsOptions))

/** Parses incoming requests with urlencoded payloads. Extended allows for rich objects and arrays to be encoded into the urlencoded format. */
app.use(express.urlencoded({ extended: true }))

/** Parses incoming requests with JSON payloads. */
app.use(express.json())

/** Compresses responses using gzip compression. */
app.use(compression())

/** Parses cookies attached to the client request object. */
app.use(cookieParser())

app.use(API_ROOT, v1Routes)

export default app
