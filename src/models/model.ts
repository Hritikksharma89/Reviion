import mongoose from 'mongoose'

import { ITokenDoc, ITokenModel } from '../interface/token.interface'
import { IUser } from '../interface/users.interfaces'
import { tokenSchema, userSchema } from '../schemas/schema'

export const Users = mongoose.models.users || mongoose.model<IUser>('users', userSchema)

export const Token =
  mongoose.models.token || mongoose.model<ITokenDoc, ITokenModel>('token', tokenSchema)
