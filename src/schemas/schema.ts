import mongoose, { Schema } from 'mongoose'

import { tokenTypes } from '../constant/token.constant'
import { ITokenDoc, ITokenModel } from '../interface/token.interface'
import { IUser } from '../interface/users.interfaces'

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
