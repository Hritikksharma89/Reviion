import { type NextFunction, type Request, type Response } from 'express';

import ValidateFactory from '@/factory/validateFactory';

import ErrorWrapper from './errorWrapper';

/**
 * Validates the request body, params, and query against the provided schema.
 * Uses the validateFactory to create validators and validate the request.
 * Catches any validation errors and passes to the errorHandler.
 */
const RequestValidate = (schema: any) => ErrorWrapper(async (req: Request, _res: Response, next: NextFunction) => {
  const { validateBody, validateParams, validateQuery } = ValidateFactory(schema, req);
  validateBody();
  validateParams();
  validateQuery();
  return next();
});

export default RequestValidate;
