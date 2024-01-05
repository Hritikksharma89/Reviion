import mongoose, { Schema } from 'mongoose'

import { tokenTypes } from '../constant/token.constant'
import { ITokenDoc, ITokenModel } from '../interface/token.interface'
import { IProfile, IUser, IUserOnboarding, IUserSetting } from '../interface/users.interfaces'

export const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  emailVerified: { type: Boolean, required: true },
  membership: { type: String, required: true },
  role: { type: String, required: true },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
})

export const profileSchema = new Schema<IProfile>({
  userId: { type: String, required: true },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
  socialLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
  },
})

export const onboardingSchema = new Schema<IUserOnboarding>({
  userId: { type: String, required: true },
  completedSteps: { type: Number, default: 0 },
  preferences: {
    language: { type: String, default: 'en' },
    theme: { type: String, default: 'light' },
  },
})

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
})

export const tokenSchema = new mongoose.Schema<ITokenDoc, ITokenModel>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: String,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)
