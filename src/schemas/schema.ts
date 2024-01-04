import mongoose, { Schema } from 'mongoose';

import { IProfile, IUser, IUserOnboarding, IUserSetting } from '../interface/users.interfaces';

export const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  emailVerified: { type: Boolean, required: true },
  membership: { type: String, required: true },
  role: { type: String, required: true },
});

export const profileSchema = new Schema<IProfile>({
  userId: { type: String, required: true },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
  socialLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
  },
});

export const onboardingSchema = new Schema<IUserOnboarding>({
  userId: { type: String, required: true },
  completedSteps: { type: Number, default: 0 },
  preferences: {
    language: { type: String, default: 'en' },
    theme: { type: String, default: 'light' },
  },
});

export const settingsSchema = new Schema<IUserSetting>({
  userId: { type: String, required: true },
  notifications: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true },
  },
  privacy: {
    hideProfile: { type: Boolean, default: false },
    hideActivity: { type: Boolean, default: false },
  },
});
