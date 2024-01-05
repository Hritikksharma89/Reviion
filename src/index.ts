import express, { Application } from 'express'
import passport from 'passport'

import { DB } from './lib/connect'
import jwtStrategy from './lib/passport'
import v1Routes from './routes'
import { environment } from './validation/env.validation'

const app: Application = express()
const port = environment.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// jwt authentication
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)
app.use('/api/v1/', v1Routes)

const start = async () => {
  try {
    await DB()
    app.listen(port, () => console.log(`Server running on port ${port}`))
  } catch (err: any) {
    console.log(err)
  }
}

start()
