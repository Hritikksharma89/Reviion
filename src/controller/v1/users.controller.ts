import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ObjectId } from 'mongoose'

import ApiError from '../../lib/apiError'
import catchAsync from '../../lib/catchAsync'
import {
  createUserService,
  deleteUserByIdService,
  getAllService,
  getServiceById,
  updateUserByIdService,
} from '../../services/user.services'

export const createUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await createUserService(req.body)
  if (!user.email) {
    res.status(httpStatus.OK).json({ message: 'Email already taken', data: {} })
  } else {
    res.status(httpStatus.CREATED).json({ message: 'User created successfully', data: user })
  }
})

export const getUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  if (typeof req.params.id === 'string') {
    const user = await getServiceById(req.params.id as unknown as ObjectId)
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    res.status(httpStatus.OK).json({ message: 'User found', data: user })
  }
})

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query
  const users = await getAllService(page as string, limit as string)
  res.status(httpStatus.OK).json({ message: 'User fetch successfully', data: users })
})

export const deleteUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  if (typeof req.params.id === 'string') {
    const user = await deleteUserByIdService(req.params.id as unknown as ObjectId)
    res.status(httpStatus.OK).json({ message: 'User deleted successfully', data: user })
  }
})
export const updateUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  if (typeof req.params.id === 'string') {
    const user = await updateUserByIdService(req.params.id as unknown as ObjectId, req.body)
    res.status(httpStatus.OK).json({ message: 'User updated successfully', data: user })
  }
})
