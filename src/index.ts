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

let server: any

const start = async () => {
  try {
    await DB()
    server = app.listen(port, () => console.log(`Server running on port ${port}`))
  } catch (err: any) {
    console.log(err)
  }
}

start()

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error: string) => {
  console.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  console.info('SIGTERM received')
  if (server) {
    server.close()
  }
})
