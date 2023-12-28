import { Schema } from 'mongoose';

import { IUser } from '../interface/interfaces';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  emailVerified: { type: Boolean },
  membership: { type: String, required: true },
  role: { type: String, required: true },
});

export { userSchema };
