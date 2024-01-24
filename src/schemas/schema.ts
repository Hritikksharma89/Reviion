import { Schema } from 'mongoose'
import { ITokenDoc, ITokenModel } from '@/interface/token.interface'
import { tokenTypes } from '@/constant/token.constant'
import { IUserDoc, IUserModel } from '@/interface/users.interfaces'

/**
 * Defines the Mongoose schema for the User model.
 */
export const userSchema = new Schema<IUserDoc, IUserModel>({
  email: { required: true, type: String },
  emailVerified: { default: false, type: Boolean },
  membership: { default: 'FREE', type: String },
  name: { required: true, type: String },
  password: {
    minlength: 8,
    required: true,
    type: String,
  },
  phone: { type: Number },
  role: { default: 'USER', type: String },
})

/**
 * Defines the Mongoose schema for the Token model.
 */
export const tokenSchema = new Schema<ITokenDoc, ITokenModel>(
  {
    blacklisted: {
      default: false,
      type: Boolean,
    },
    expires: {
      required: true,
      type: Date,
    },
    token: {
      index: true,
      required: true,
      type: String,
    },
    type: {
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
      required: true,
      type: String,
    },
    user: {
      ref: 'User',
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  },
)
