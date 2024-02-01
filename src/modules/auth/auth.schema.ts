import mongoose from 'mongoose';
import { string } from 'zod';

export const authSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: {
    access: { expires: { type: Date }, token: { type: String } },
    refresh: { expires: { type: Date }, token: { type: String } },
  },
  role: { type: String, required: true },
  membership: { type: String, required: true },
  userId: { type: String, required: true },
});
