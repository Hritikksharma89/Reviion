import { Application } from 'express'
import { Server } from 'http'

import { environment } from '@/validation/env.validation'

interface ServerFactory {
  databaseConnection: (db: () => Promise<string>) => Promise<void>
  SIGTERM: () => void
  start: (app: Application) => Server
  uncaughtException: () => void
  unhandledRejection: () => void
}

const { PORT } = environment

/**
 * Closes the server instance if it exists and logs any error.
 *
 * @param error - The error object to log if provided
 */
const closeServer = (error: Error) => {
  server && server.close(() => process.exit(1))
  error && console.log(error)
}

let server: Server | null = null

/**
 * Creates a ServerFactory instance with methods for starting the server,
 * handling errors, and connecting to the database.
 */

const ServerFactory = (): ServerFactory => ({
  /**
   * Handles SIGTERM signal to gracefully close the server instance.
   */
  SIGTERM: () => process.on('SIGTERM', (error: Error) => closeServer(error)),
  /**
   * Starts the HTTP server instance with the given Express app.
   * Returns the Node.js HTTP server instance.
   */
  start: (app: Application) =>
    (server = app.listen(PORT, () => console.log(`Server is running on ${PORT}`))),
  /**
   * Connects to the database using the provided callback function.
   * Logs the result of the database connection callback.
   */
  databaseConnection: async (db) => console.log(await db()),
  /**
   * Handles uncaught exceptions in the app by closing the server instance.
   */
  uncaughtException: () => process.on('uncaughtException', (error: Error) => closeServer(error)),
  /**
   * Handles unhandled promise rejections in the app by closing the server instance.
   */
  unhandledRejection: () => process.on('unhandledRejection', (error: Error) => closeServer(error)),
})

export default ServerFactory
