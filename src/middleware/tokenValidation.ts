import { NextFunction, Request, Response } from 'express'

import ResponseFactory from '@/factory/responseFactory'
import { verifyToken } from '@/services/token.services'
import { GetUserById } from '@/services/user.services'

import ErrorWrapper from './errorWrapper'

/**
 * Middleware function that validates the JWT token from the authorization header.
 * Verifies the token signature and checks if the user exists.
 * If valid, calls next() to proceed to next middleware.
 * If invalid, returns 401 unauthorized or 404 user not found response.
 */
const TokenValidation = ErrorWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const verifiedToken = verifyToken(req.headers.authorization as string)
  if (!verifiedToken) return ResponseFactory(res).unauthorized()
  if (!(await GetUserById(verifiedToken.sub))) return ResponseFactory(res).notFound()
  return next()
})
export default TokenValidation
