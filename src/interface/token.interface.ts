import { JwtPayload } from 'jsonwebtoken'
import { Document, Model } from 'mongoose'

export interface IToken {
  blacklisted: boolean
  expires: Date
  token: string
  type: string
  user: string
}

export type NewToken = Omit<IToken, 'blacklisted'>

export interface ITokenDoc extends IToken, Document {}

export interface ITokenModel extends Model<ITokenDoc> {}

export interface IPayload extends JwtPayload {
  exp: number
  iat: number
  sub: string
  type: string
}

export interface TokenPayload {
  expires: Date
  token: string
}

export interface AccessAndRefreshTokens {
  access: TokenPayload
  refresh: TokenPayload
}
