import { Request, Response } from 'express';


import tryCatch from '../../trycatch';
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from './user.services';
import mongoose from 'mongoose';

export const GetUsers = tryCatch(async (req: Request, res: Response) => {
  const { skip, limit, sort } = req.query;
  const users = await getAllUsers(skip as string, limit as string, sort as string)
  if (users.length < 0) {
    res.status(200).json({ message: 'No user found', data: users });
  } else {
    res.status(200).json({ message: 'User fetch successfully', data: users });
  }
})



export const GetUserById = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const _id = new mongoose.Types.ObjectId(req.params.id)
  if (!_id) {
    return res.status(400).json({ message: 'Invalid user ID', data: null });
  }
  const user = await getUserById(_id);
  if (user) {
    return res.status(200).json({ message: 'User id found', data: user });
  } else {
    return res.status(404).json({ message: 'No user found', data: user });
  }
})

export const CreateUser = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const user = await createUser(req.body);
  if (user) {
    return res.status(201).json({ message: 'User created successfully', data: user });
  } else {
    return res.status(204).json({ message: 'Failed to create user', data: user });
  }
})

export const DeleteUserById = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const _id = new mongoose.Types.ObjectId(req.params.id)
  const user = await deleteUserById(_id);
  if (user) {
    return res.status(201).json({ message: 'User deleted successfully', data: user });
  } else {
    return res.status(204).json({ message: 'Failed to delete user', data: user });
  }
})

export const UpdateUserById = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const _id = new mongoose.Types.ObjectId(req.params.id)
  const payload = req.body;
  console.log(payload);
  const user = await updateUserById(_id, payload);
  if (user) {
    return res.status(201).json({ message: 'User updated successfully', data: user });
  } else {
    return res.status(204).json({ message: 'Failed to update user', data: user });
  }
})
