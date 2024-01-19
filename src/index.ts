import { databaseConnection } from '@/database/connect'
import ServerFactory from '@/factory/serverFactory'

import app from './app'

ServerFactory().startDatabase(databaseConnection)
app.listen(3000, () => console.log(`Server is running on ${3000}`))
// ServerFactory().start(app)
// ServerFactory().uncaughtException()
// ServerFactory().unhandledRejection()
// ServerFactory().SIGTERM()
