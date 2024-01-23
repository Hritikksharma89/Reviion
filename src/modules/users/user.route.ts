
import { Router } from 'express';

import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from './user.controller';

const userRoute = Router();

userRoute.get('/', getAllUsers);
userRoute.get('/:id', getUserById);
userRoute.post('/', createUser);
userRoute.delete('/:id', deleteUserById);
userRoute.put('/:id', updateUserById);

export default userRoute;
