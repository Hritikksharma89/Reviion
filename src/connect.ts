import mongoose from 'mongoose';

import { environment } from './env';

mongoose.Promise = global.Promise;

export const DB = async (): Promise<void> => {
  try {
    await mongoose.connect(environment?.DATABASE_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
