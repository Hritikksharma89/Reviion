import { type NextFunction, type Request, type Response, request } from 'express'
import httpStatus from 'http-status'
import { z } from 'zod'

const validate =
  (schema: Record<string, any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        res
          .status(httpStatus.NON_AUTHORITATIVE_INFORMATION)
          .send({ message: 'Validation error', data: [], error: error.errors })
      } else {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: 'Unexpected error', data: [], error: error })
      }
    }
  }

export default validate
