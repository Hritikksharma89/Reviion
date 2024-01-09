import { type NextFunction, type Request, type Response, request } from 'express'
import { z } from 'zod'

import pick from '../utils/pick'

const validate =
  (schema: Record<string, any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.send({ 'Validation error': error.errors })
      } else {
        res.send({ 'Unexpected error:': error })
      }
    }
  }

export default validate
