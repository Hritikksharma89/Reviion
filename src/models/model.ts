import mongoose from 'mongoose'

import { ITokenDoc, ITokenModel } from '../interface/token.interface'
import { IProfile, IUser, IUserOnboarding, IUserSetting } from '../interface/users.interfaces'
import {
  onboardingSchema,
  profileSchema,
  settingsSchema,
  tokenSchema,
  userSchema,
} from '../schemas/schema'

export const Users = mongoose.models.users || mongoose.model<IUser>('users', userSchema)

export const Profiles =
  mongoose.models.profiles || mongoose.model<IProfile>('profiles', profileSchema)

export const Settings =
  mongoose.models.settings || mongoose.model<IUserSetting>('settings', settingsSchema)

export const Onboardings =
  mongoose.models.onboardings || mongoose.model<IUserOnboarding>('onboardings', onboardingSchema)

export const Token =
  mongoose.models.token || mongoose.model<ITokenDoc, ITokenModel>('token', tokenSchema)
