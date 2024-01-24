import { type NextFunction, type Request, type Response } from 'express'

import ValidateFactory from '@/factory/validateFactory'

import ErrorWrapper from './errorWrapper'

interface RequestValidate {
  (schema: object): (req: Request, res: Response, next: NextFunction) => void
}

/**
 * Validates the request body, params, and query against the provided schema.
 * Uses the validateFactory to create validators and validate the request.
 * Catches any validation errors and passes to the errorHandler.
 */
const RequestValidate: RequestValidate = (schema) =>
  // eslint-disable-next-line @typescript-eslint/require-await
  ErrorWrapper(async (req, res, next) => {
    void ValidateFactory(schema, req).validateBody()
    void ValidateFactory(schema, req).validateParams()
    void ValidateFactory(schema, req).validateQuery()
    return next()
  })

export default RequestValidate
