import { Document } from 'mongoose'
import { Url } from 'url'

export type TRole = 'User' | 'Admin' | 'Employee'
export type TMembership = 'Premium' | 'Free' | 'Enterprise'
export interface ISocial {
  name: string
  url: Url
}

export interface IUser extends Document {
  id: string
  name: string
  image: Url
  email: string
  phone: number
  emailVerified: boolean
  bio: string
  social: ISocial[]
  dob: Date
  language: string
  role: TRole
  membership: TMembership
  project: string[]
  onboarding: boolean
}

