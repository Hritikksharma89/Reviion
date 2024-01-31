import { Schema } from 'mongoose';

import { IUser } from './user.interface';

export const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  emailVerified: { type: Boolean, required: true },
  membership: { type: String, required: true },
  role: { type: String, required: true },
});
