import { Request, Response } from 'express'
import httpStatus from 'http-status'

import catchAsync from '../../lib/catchAsync'
import {
  createUserService,
  deleteUserByIdService,
  getAllService,
  getServiceById,
  updateUserByIdService,
} from '../../services/user.services'

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query
  const users = await getAllService(page as string, limit as string)
  res.status(httpStatus.OK).json({ message: 'User fetch successfully', data: users })
})

export const getUserById = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await getServiceById(req.params.id)
  res.status(httpStatus.OK).json({ message: 'User id found', data: user })
})

export const createUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await createUserService(req.body)
  res.status(httpStatus.OK).json({ message: 'User created successfully', data: user })
})

export const deleteUserById = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await deleteUserByIdService(req.params.id)
  res.status(httpStatus.OK).json({ message: 'User deleted successfully', data: user })
})
export const updateUserById = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await updateUserByIdService(req.params.id, req.body)
  res.status(httpStatus.OK).json({ message: 'User updated successfully', data: user })
})
