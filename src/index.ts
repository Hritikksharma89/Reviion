import { databaseConnection } from '@/database/connect'
import ServerFactory from '@/factory/serverFactory'

import app from './app'

/**
 * Connects to the database using the provided databaseConnection.
 * This allows the server factory to establish a connection to the
 * database before starting the server.
 */
void ServerFactory().databaseConnection(databaseConnection)

/**
 * Starts the server by passing the Express app instance to the
 * ServerFactory start method.
 */
ServerFactory().start(app)
/**
 * Registers a handler for uncaught exceptions. This allows the
 * server to handle and log uncaught exceptions before shutting down.
 */
ServerFactory().uncaughtException()
/**
 * Registers a handler for unhandled promise rejections.
 * This allows the server to handle and log unhandled promise rejections
 * before shutting down.
 */
ServerFactory().unhandledRejection()
/**
 * Registers a handler for the SIGTERM signal to gracefully shut down the server.
 */
ServerFactory().SIGTERM()
