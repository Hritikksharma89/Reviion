import mongoose from 'mongoose'
import { environment } from '@/validation/env.validation'

mongoose.Promise = global.Promise

/**
 * Connects to the MongoDB database.
 */
export const databaseConnection = async () => {
  try {
    await mongoose.connect(environment.DATABASE_URL)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error connecting to MongoDB: Check Database Url')
    throw new Error('Connection error')
  }
}
