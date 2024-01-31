import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';

import tryCatch from './trycatch';

// If the object has at least one key, it returns true, indicating that the object is not empty.
// If the object has no keys (i.e., its length is 0), it returns false, indicating that the object is empty.
const IsEmptyObject = (object: object): boolean => Object.keys(object).length !== 0;

const validateFactory = (validateObject: any) =>
  tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const {
      body,
      params,
      query,
    }: {
      body?: z.AnyZodObject;
      params?: z.AnyZodObject;
      query?: z.AnyZodObject;
    } = validateObject;

    // If req.params is not empty and there is a params validation object, parse req.params
    if (IsEmptyObject(req.params) && params) {
      console.log('params', params.parse(req.params));
    }

    // If req.query is not empty and there is a query validation object, parse req.query
    if (IsEmptyObject(req.query) && query) {
      console.log('query', query.parse(req.query));
    }

    // If req.body is not empty and there is a body validation object, parse req.body
    if (IsEmptyObject(req.body) && body) {
      console.log('body', body.parse(req.body));
    }

    return next();
  });

export default validateFactory;
