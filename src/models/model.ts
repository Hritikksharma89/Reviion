import { ITokenDoc, ITokenModel } from '@/interface/token.interface'
import { tokenSchema, userSchema } from '@/schemas/schema'
import { IUserDoc, IUserModel } from '@/interface/users.interfaces'
import mongoose from 'mongoose'

/**
 * Defines a Mongoose model for the 'users' collection, representing user documents in the database.
 * The model uses the previously defined 'userSchema' to specify the shape of user documents.
 * The model is exported as 'Users' and created lazily if it does not already exist.
 */
export const Users =
  mongoose.models.users || mongoose.model<IUserDoc, IUserModel>('users', userSchema, 'users')

/**
 * Defines a Mongoose model for the 'token' collection, representing token documents in the database.
 * The model uses the previously defined 'tokenSchema' to specify the shape of token documents.
 * The model is exported as 'Token' and created lazily if it does not already exist.
 */
export const Token =
  mongoose.models.token || mongoose.model<ITokenDoc, ITokenModel>('token', tokenSchema, 'token')
