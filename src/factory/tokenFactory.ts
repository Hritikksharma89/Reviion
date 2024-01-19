import jwt from 'jsonwebtoken'
import moment, { Moment } from 'moment'

import { environment } from '@/validation/env.validation'

interface TokenPayload {
  exp: number
  iat: number
  role: string
  sub: string
  type: string
}

type Payload = (id: string, role: string, expires: Moment, type: string) => TokenPayload

interface TokenFactory {
  accessExpire: Moment
  generate: (id: string, role: string, expires: Moment, type: string) => string
  refreshExpire: Moment
  verify: (token: string) => TokenPayload
}

/**
 * Payload is a function that returns a TokenPayload object
 * based on the provided id, role, expires and type parameters.
 *
 * It is used to generate the payload for JWT tokens in the TokenFactory.
 */
const payload: Payload = (id, role, expires, type) => ({
  exp: expires.unix(),
  iat: moment().unix(),
  role,
  sub: id,
  type,
})

const SECRET: string = environment.JWT_SECRET
const ACCESS_EXPIRATION: string = environment.JWT_ACCESS_EXPIRATION_MINUTES
const REFRESH_EXPIRATION: string = environment.JWT_REFRESH_EXPIRATION_DAYS

/**
 * TokenFactory returns an object implementing the TokenFactory interface.
 * It contains methods for generating and verifying JWT tokens
 * with different expiration times.
 */
const TokenFactory = (): TokenFactory => ({
  accessExpire: moment().add(ACCESS_EXPIRATION, 'minutes'),
  generate: (id, role, expires, type) => jwt.sign(payload(id, role, expires, type), SECRET),
  refreshExpire: moment().add(REFRESH_EXPIRATION, 'days'),
  verify: (token) => jwt.verify(token, SECRET) as TokenPayload,
})

export default TokenFactory
