import { NextFunction, Request, Response } from 'express'

import ErrorFactory from '@/factory/errorFactory'

/**
 * Wraps the given async route handler function in a try/catch block.
 * Catches any errors thrown in the route handler and passes to the error handling middleware.
 */
const ErrorWrapper = (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next)
    return next()
  } catch (error: any) {
    return ErrorFactory(error, res)
  }
}
export default ErrorWrapper
