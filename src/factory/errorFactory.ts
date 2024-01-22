import { Response } from 'express'
import { ZodError } from 'zod'

import ResponseFactory from './responseFactory'

// Define an interface for the ErrorFactory function
interface ErrorFactory {
  (error: any, res: Response): void
}

const err = {
  dbCast: 'Database Cast Error',
  dbValidation: 'Database Validation Error',
  validation: 'Validation Error',
}

/**
 * Handles errors by returning appropriate error responses.
 * Checks error type and returns tailored notFound response.
 */
const ErrorFactory: ErrorFactory = (error, res) => {
  if (error instanceof ZodError) return ResponseFactory(res).notFound(error.errors, err.validation)
  if (error instanceof Error && error.name === err.validation)
    return ResponseFactory(res).notFound(error.message, err.dbValidation)
  if (error instanceof Error && error.name === 'CastError')
    return ResponseFactory(res).notFound(error.message, err.dbCast)
  return ResponseFactory(res).notFound(error.message, 'Error')
}

export default ErrorFactory
