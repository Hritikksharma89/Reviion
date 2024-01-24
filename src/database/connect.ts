import mongoose from 'mongoose'
import { environment } from '@/validation/env.validation'

mongoose.Promise = global.Promise

/**
 * Connects to the MongoDB database.
 */
export const databaseConnection = async (): Promise<string> => {
  try {
    await mongoose.connect(environment.DATABASE_URL)
    return 'Connected to MongoDB'
  } catch (error) {
    return 'Error connecting to MongoDB: Check Database Url'
  }
}
