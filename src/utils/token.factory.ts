
import jwt from 'jsonwebtoken'
// @ts-ignore
import moment, { Moment } from 'moment'
import { environment } from '../env'
import mongoose from 'mongoose'



interface TokenPayload {
  exp: number
  iat: number
  role: string
  userId: mongoose.Types.ObjectId
  type: string
}

type Payload = (id: mongoose.Types.ObjectId, role: string, expires: Moment, type: string) => TokenPayload

interface TokenFactory {
  accessExpire: Moment
  generate: (id: mongoose.Types.ObjectId, role: string, expires: Moment, type: string) => string
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
  userId: id,
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
  /**
   * The accessExpire sets the expiration for access tokens.
   * It is calculated by adding the ACCESS_EXPIRATION duration (in minutes)
   * to the current moment.
   */
  accessExpire: moment().add(ACCESS_EXPIRATION, 'minutes'),
  /**
   * The generate creates a signed JWT token using the provided payload.
   * It signs the token using the application secret and returns
   * the generated token string.
   */
  generate: (id, role, expires, type) => jwt.sign(payload(id, role, expires, type), SECRET),
  /**
   * The refreshExpire sets the expiration for refresh tokens.
   * It is calculated by adding the REFRESH_EXPIRATION duration (in days)
   * to the current moment.
   */
  refreshExpire: moment().add(REFRESH_EXPIRATION, 'days'),
  /**
   * Verifies the provided JWT token using the secret from the environment.
   * Returns the decoded token payload if valid.
   * Throws an error if the token is invalid.
   */
  verify: (token) => jwt.verify(token, SECRET) as TokenPayload,
})

export default TokenFactory