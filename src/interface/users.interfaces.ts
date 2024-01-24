import { Document, Model } from 'mongoose'

/**
 * Type for user membership levels.
 */
export type TMembership = 'ENTERPRISE' | 'PREMIUM' | 'FREE'
/**
 * Type for user roles.
 */
export type TRole = 'MANAGER' | 'ADMIN' | 'USER'

/**
 * Interface for user data model.
 */
export interface IUser {
  email: string
  emailVerified: boolean
  membership: TMembership
  name: string
  password: string
  phone: number
  role: TRole
}

/**
 * Interface extending the IUser interface and Mongoose Document.
 * Represents a MongoDB document for a user.
 */
export interface IUserDoc extends IUser, Document {}
/**
 * Interface extending Mongoose Model with IUserDoc
 * for the User model.
 */
export interface IUserModel extends Model<IUserDoc> {}

/**
 * Interface for updating an existing user.
 * Extends IUser and omits the email field to prevent updating a user's email.
 */
export interface IUpdateUser extends Partial<Omit<IUser, 'email'>> {}

/**
 * Interface for creating a new user.
 * Extends IUser interface and omits role, emailVerified, and membership fields.
 */
export interface ICreateUser
  extends Partial<Omit<IUser, 'role' | 'emailVerified' | 'membership'>> {}
