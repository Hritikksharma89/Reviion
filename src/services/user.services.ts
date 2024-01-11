import type { ObjectId } from 'mongoose'

import type { IUser, NewCreatedUser, UpdateUserBody } from '../interface/users.interfaces'
import { Users } from '../models/model'

/**
 * Get all users with pagination support.
 * @param page - Page number.
 * @param limit - Number of items per page.
 * @returns List of users.
 */
export const getAllUsers = async (page?: string, limit?: string): Promise<IUser[]> => {
  const skip = (Number(page) - 1) * Number(limit)
  const users = await Users.find().skip(skip).limit(Number(limit)).sort({ _id: -1 }) // Use { _id: -1 } for descending order
  return users
}

/**
 * Get a user by their ID.
 * @param _id - User ID.
 * @returns The user with the specified ID or null if not found.
 */
export const getUserById = async (_id: ObjectId): Promise<IUser | null> => {
  const user = await Users.findById(_id)
  return user
}

/**
 * Create a new user.
 * @param userBody - User details to create.
 * @returns The created user.
 */
export const createUser = async (userBody: NewCreatedUser): Promise<IUser> => {
  const user = await Users.create(userBody)
  return user
}

/**
 * Delete a user by their ID.
 * @param _id - User ID to delete.
 * @returns The deleted user.
 */
export const deleteUserById = async (_id: ObjectId): Promise<IUser> => {
  const user = await Users.findByIdAndDelete(_id)
  return user
}

/**
 * Update a user by their ID.
 * @param _id - User ID to update.
 * @param updateBody - New user details.
 * @returns The updated user.
 */
export const updateUserById = async (
  _id: ObjectId,
  updateBody: UpdateUserBody,
): Promise<IUser | null> => {
  const user = await Users.findByIdAndUpdate(_id, updateBody, { new: true }) // Use { new: true } to return the updated document
  return user
}

/**
 * Get a user by their email address.
 * @param email - User email address.
 * @returns The user with the specified email.
 */
export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const user = await Users.findOne({ email })
  return user
}

/**
 * Get a user by their email address and password.
 * @param email - User email address.
 * @param password - User password.
 * @returns The user with the specified email and password combination.
 */
export const getUserByEmailAndPassword = async (
  email: string,
  password: string,
): Promise<IUser | null> => {
  const user = await Users.findOne({ email, password })
  return user
}
