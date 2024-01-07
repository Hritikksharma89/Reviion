import { Document, ObjectId } from 'mongoose'

export type TMembership = 'PREMIUM' | 'FREE' | 'ENTERPRISE'
export type TRole = 'USER' | 'ADMIN' | 'MANAGER'

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

export type UpdateUserBody = Partial<IUser>

export type NewCreatedUser = Omit<IUser, 'emailVerified'>
