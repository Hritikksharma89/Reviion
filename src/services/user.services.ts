import type { NewCreatedUser, UpdateUserBody } from '@/interface/users.interfaces'

import Factory from '@/factory/factory'
import { Users } from '@/models/model'

/**
 * Gets users with optional pagination.
 *
 * @param page - Page number for pagination
 * @param limit - Number of users per page
 * @returns Promise resolving to array of user documents
 */
export const GetUsers = async (page?: string, limit?: string) => Factory(Users).find(page, limit)

/**
 * Gets a user by ID.
 *
 * @param id - The ID of the user to find.
 * @returns Promise resolving to the found user document.
 */
export const GetUserById = async (id: string) => Factory(Users).findById(id)

/**
 * Creates a new user with the provided user body.
 */
export const CreateUser = async (userBody: NewCreatedUser) => Factory(Users).create(userBody)

/**
 * Deletes a user by ID.
 *
 * @param id - The ID of the user to delete.
 */
export const DeleteUserById = async (id: string) => Factory(Users).findByIdAndDelete(id)

/**
 * Updates a user by ID with the provided update body.
 *
 * @param id - The ID of the user to update
 * @param payload - The update body containing the fields to update
 * @returns The updated user document
 */
export const UpdateUserById = async (id: string, payload: UpdateUserBody) =>
  Factory(Users).findByIdAndUpdate(payload, id, { new: true })

/**
 * Gets a user by a provided filter criteria.
 *
 * @param payload - The filter criteria to find the user by.
 */
export const GetUser = async (payload: any) => Factory(Users).findOne(payload)

/**
 * Gets a user by their email address.
 *
 * @param email - The email address of the user to find.
 * @returns Promise resolving to the found user document.
 */
export const GetUserByEmail = async (email: string) => Factory(Users).findOne({ email })

/**
 * Gets a user by their email address and password.
 *
 * @param payload - Filter criteria containing email and password to find the user by.
 */
export const GetUserByEmailAndPassword = async (payload: any) => Factory(Users).findOne(payload)
