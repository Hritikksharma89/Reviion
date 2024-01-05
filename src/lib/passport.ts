import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

import { tokenTypes } from '../constant/token.constant'
import { IPayload } from '../interface/token.interface'
import { Users } from '../models/model'
import { environment } from '../validation/env.validation'

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: environment.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: IPayload, done) => {
    try {
      if (payload.type !== tokenTypes.ACCESS) {
        throw new Error('Invalid token type')
      }
      const user = await Users.findById(payload.sub)
      if (!user) {
        return done(null, false)
      }
      done(null, user)
    } catch (error) {
      done(error, false)
    }
  },
)

export default jwtStrategy
