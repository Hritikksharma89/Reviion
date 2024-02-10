import mongoose from 'mongoose';

import { IUser } from './user.interface';

// export const userSchema = new Schema<IUser>({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: Number, required: true },
//   emailVerified: { type: Boolean, required: true },
//   membership: { type: String, required: true },
//   role: { type: String, required: true },
// });

export const socialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  image: { type: String, required: false },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
  bio: { type: String },
  socials: [socialSchema], // Array of social objects
  dob: { type: Date },
  language: { type: String },
  role: { type: String, enum: ['User', 'Admin', 'Employee'] },
  membership: { type: String, enum: ['Premium', 'Free', 'Enterprise'] },
  projects: [{ type: String }],
  teams: [{ type: String }],
  tasks: [{ type: String }],
  onboarding: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default userSchema;
