import { Application } from 'express'
import { Server } from 'http'

import { environment } from '@/validation/env.validation'

interface ServerFactory {
  SIGTERM: () => void
  start: (app: Application) => Server
  startDatabase: (db: () => void) => void
  uncaughtException: () => void
  unhandledRejection: () => void
}

const { PORT } = environment

const closeServer = (error: Error) => {
  server && server.close(() => process.exit(1))
  error && console.log(error)
}

let server: Server | null = null

/**
 * ServerFactory returns an object implementing the ServerFactory interface.
 *
 * The returned object contains methods for starting the server, handling
 * uncaught exceptions, unhandled rejections, and SIGTERM signals.
 */
const ServerFactory = (): ServerFactory => ({
  SIGTERM: () => process.on('SIGTERM', (error: Error) => closeServer(error)),
  start: (app) => (server = app.listen(PORT, () => console.log(`Server is running on ${PORT}`))),
  startDatabase: (db) => db(),
  uncaughtException: () => process.on('uncaughtException', (error: Error) => closeServer(error)),
  unhandledRejection: () => process.on('unhandledRejection', (error: Error) => closeServer(error)),
})
export default ServerFactory
