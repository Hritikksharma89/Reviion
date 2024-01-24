import { Request } from 'express'
import { IsEmptyObject } from '@/utils/isEmptyObject'
import { z } from 'zod'

interface ValidateFactory {
  (
    schema: {
      body?: z.AnyZodObject
      params?: z.AnyZodObject
      query?: z.AnyZodObject
    },
    req: Request,
  ): {
    validateParams: () => void
    validateQuery: () => void
    validateBody: () => void
  }
}

/**
 * Validates a request object against a schema, returning middleware
 * functions to validate the request body, query, and params.
 *
 * @param schema - The schema object to validate against
 * @param req - The request object
 * @returns Middleware functions to validate body, query, and params
 */
const ValidateFactory: ValidateFactory = (schema, req) => {
  const { body, params, query } = schema

  return {
    validateParams: () => {
      if (IsEmptyObject(req.params) && params) params.parse(req.params)
    },
    validateQuery: () => {
      if (IsEmptyObject(req.query) && query) query.parse(req.query)
    },
    validateBody: () => {
      if (IsEmptyObject(req.body) && body) body.parse(req.body)
    },
  }
}

export default ValidateFactory
