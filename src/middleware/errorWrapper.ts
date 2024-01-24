import { NextFunction, Request, Response } from 'express'

import ErrorFactory from '@/factory/errorFactory'

interface ErrorWrapper {
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  ): (req: Request, res: Response, next: NextFunction) => Promise<void>
}

/**
 * Wraps the given async route handler function in a try/catch block.
 * Catches any errors thrown in the route handler and passes to the error handling middleware.
 */
const ErrorWrapper: ErrorWrapper = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next)
    return next()
  } catch (error) {
    return ErrorFactory(error as Error, res)
  }
}

export default ErrorWrapper
