import { Document, ObjectId } from 'mongoose'

export type TMembership = 'PREMIUM' | 'FREE' | 'ENTERPRISE'
export type TRole = 'USER' | 'ADMIN' | 'MANAGER'
export type ITheme = 'dark' | 'system' | 'light'

export interface ISocialLinks {
  facebook: string
  twitter: string
  instagram: string
}
export interface INotification {
  email: boolean
  push: boolean
}

export interface IPreferences {
  language: string
  theme: ITheme
}

export interface IPrivacy {
  hideProfile: boolean
  hideActivity: boolean
}

export interface IUser extends Document {
  id: ObjectId
  name: string
  email: string
  phone: Number
  emailVerified: boolean
  membership: TMembership
  role: TRole
  password: string
}

export interface IProfile extends Document {
  userId: string
  bio: string
  avatar: string
  socialLinks: ISocialLinks
}

export interface IUserOnboarding extends Document {
  userId: string
  completedSteps: number
  preferences: IPreferences
}

export interface IUserSetting extends Document {
  userId: string
  notifications: INotification
  privacy: IPrivacy
}
