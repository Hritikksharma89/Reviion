import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ObjectId } from 'mongoose'

import catchAsync from '../../lib/catchAsync'
import {
  createUserService,
  deleteUserByIdService,
  getAllService,
  getServiceById,
  getUserByEmail,
  updateUserByIdService,
} from '../../services/user.services'

export const createUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const getUser = await getUserByEmail(req.body.email)
  if (getUser) {
    res.status(httpStatus.OK).json({ message: 'Email already taken', data: {}, error: {} })
  } else {
    const user = await createUserService(req.body)
    res
      .status(httpStatus.CREATED)
      .json({ message: 'User created successfully', data: user, error: {} })
  }
})

export const getUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  if (typeof req.params.id === 'string') {
    const user = await getServiceById(req.params.id as unknown as ObjectId)
    if (!user) {
      res.status(httpStatus.NOT_FOUND).send({ message: 'User not found', data: {}, error: {} })
    } else {
      res.status(httpStatus.OK).json({ message: 'User fetch successfully', data: user, error: {} })
    }
  } else {
    res.status(httpStatus.NOT_FOUND).json({ message: 'User ID not found', data: {}, error: {} })
  }
})

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query
  const users = await getAllService(page as string, limit as string)
  res.status(httpStatus.OK).json({ message: 'User fetch successfully', data: users, error: {} })
})

export const deleteUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  if (typeof req.params.id === 'string') {
    const checkUser = await getServiceById(req.params.id as unknown as ObjectId)
    if (checkUser) {
      const user = await deleteUserByIdService(req.params.id as unknown as ObjectId)
      res
        .status(httpStatus.OK)
        .json({ message: 'User deleted successfully', data: user, error: {} })
    } else {
      res.status(httpStatus.NOT_FOUND).json({ message: 'User not found', data: {}, error: {} })
    }
  } else {
    res.status(httpStatus.NOT_FOUND).json({ message: 'User ID not found', data: {}, error: {} })
  }
})

export const updateUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  if (typeof req.params.id === 'string') {
    const getUser = await getUserByEmail(req.body.email)
    if (getUser && getUser.email && getUser.email !== req.body.email) {
      res.status(httpStatus.OK).json({ message: 'Email already taken', data: {}, error: {} })
    }
    const user = await updateUserByIdService(req.params.id as unknown as ObjectId, req.body)
    res.status(httpStatus.OK).json({ message: 'User updated successfully', data: user, error: {} })
  } else {
    res.status(httpStatus.NOT_FOUND).json({ message: 'User ID not found', data: {}, error: {} })
  }
})
