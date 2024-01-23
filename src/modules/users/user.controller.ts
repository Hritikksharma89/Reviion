import { Request, Response } from 'express';
import { IUser } from './user.interface';
import { Users } from './user.model';



export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 1 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const user = await Users.find<IUser[]>().skip(skip).limit(Number(limit)).sort('desc');
    if (user.length < 0) {
      res.status(200).json({ message: 'No user found', data: user });
    } else {
      res.status(200).json({ message: 'User fetch successfully', data: user });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: [], error: error.data.message });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id: string = req.params.id;
    const user = await Users.findById<IUser>(_id);
    if (!_id) {
      res.status(400).json({ message: 'Invalid user ID', data: null });
    }

    if (user) {
      res.status(200).json({ message: 'User id found', data: user });
    } else {
      res.status(404).json({ message: 'No user found', data: user });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: [], error: error.data.message });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await Users.create<IUser>(req.body);
    if (user) {
      res.status(201).json({ message: 'User created successfully', data: user });
    } else {
      res.status(204).json({ message: 'Failed to create user', data: user });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: {}, error: error?.message });
  }
};

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id: string = req.params.id;
    const user = await Users.findByIdAndDelete<IUser>(_id);
    if (user) {
      res.status(201).json({ message: 'User deleted successfully', data: user });
    } else {
      res.status(204).json({ message: 'Failed to delete user', data: user });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: {}, error: error?.message });
  }
};

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id: string = req.params.id;
    const payload: IUser = req.body;
    console.log(payload);
    const user = await Users.findByIdAndUpdate<IUser>(_id, payload);
    if (user) {
      res.status(201).json({ message: 'User updated successfully', data: user });
    } else {
      res.status(204).json({ message: 'Failed to update user', data: user });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: {}, error: error?.message });
  }
};
