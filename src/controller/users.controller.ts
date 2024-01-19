import {
  CreateUser,
  DeleteUserById,
  GetUser,
  GetUserByEmail,
  GetUserById,
  GetUsers,
  UpdateUserById,
} from '@/services/user.services'
import { Request, Response } from 'express'

import ResponseFactory from '@/factory/responseFactory'
import ErrorWrapper from '@/middleware/errorWrapper'

/**
 * Creates a new user.
 *
 * Wrapped in ErrorWrapper middleware to handle errors.
 *
 * Checks if a user with the given email already exists.
 * If so, returns 409 conflict.
 *
 * Calls CreateUser service to create the user.
 *
 * Returns 201 with the created user on success.
 */
export const createNewUser = ErrorWrapper(async (req: Request, res: Response) => {
  if (await GetUserByEmail(req.body.email)) return ResponseFactory(res).conflict()
  return ResponseFactory(res).successCreated(await CreateUser(req.body))
})

/**
 * Gets a user by ID.
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * Wrapped in ErrorWrapper middleware to handle errors.
 *
 * Calls GetUserById service to retrieve user by ID.
 *
 * Returns 404 if user not found, otherwise returns the user.
 */
export const getUserById = ErrorWrapper(async (req: Request, res: Response) => {
  const user = await GetUserById(req?.params?.id)
  if (!user) return ResponseFactory(res).notFound()
  return ResponseFactory(res).successCreated(user)
})

/**
 * Gets all users.
 *
 * Wrapped in ErrorWrapper middleware to handle errors.
 *
 * Calls GetUsers service to retrieve paginated users.
 *
 * Returns list of users.
 */
export const getUsers = ErrorWrapper(async (req: Request, res: Response) => {
  const users = await GetUsers(req.query.page as string, req.query.limit as string)
  return ResponseFactory(res).success(users)
})

/**
 * Deletes a user by ID.
 *
 * Wrapped in ErrorWrapper middleware to handle errors.
 *
 * Checks if a user with the given ID exists.
 * If not, returns 404 not found.
 *
 * Calls DeleteUserById service to delete the user.
 *
 * Returns 204 on success.
 */
export const deleteUser = ErrorWrapper(async (req: Request, res: Response) => {
  if (!(await GetUserById(req.params.id))) return ResponseFactory(res).notFound()
  return ResponseFactory(res).successCreated(await DeleteUserById(req.params.id))
})

/**
 * Updates a user by ID.
 *
 * Wrapped in ErrorWrapper middleware to handle errors.
 *
 * Checks if a user with the given ID and email exists.
 * If not, returns 409 conflict error.
 *
 * Calls UpdateUserById service to update the user data.
 *
 * Returns 200 with updated user data on success.
 */
export const updateUser = ErrorWrapper(async (req: Request, res: Response) => {
  const { email, ...updateData } = req.body
  const existingUser = await GetUser({ email, id: req.params['id'] })
  if (!existingUser) return ResponseFactory(res).notFound()
  return ResponseFactory(res).successCreated(await UpdateUserById(req.params['id'], updateData))
})
