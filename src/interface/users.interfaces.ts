import { Document } from 'mongoose'

export type TMembership = 'ENTERPRISE' | 'PREMIUM' | 'FREE'
export type TRole = 'MANAGER' | 'ADMIN' | 'USER'

export interface IUser extends Document {
  email: string
  emailVerified: boolean
  id: string
  membership: TMembership
  name: string
  password: string
  phone: number
  role: TRole
}

export type UpdateUserBody = Partial<IUser>

export type NewCreatedUser = Omit<UpdateUserBody, 'emailVerified'>
