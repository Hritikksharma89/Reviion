import express from 'express';

import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from '../../controller/v1/users.controller';

const userRoute = express.Router();

userRoute.get('/', getAllUsers);
userRoute.get('/:id', getUserById);
userRoute.post('/', createUser);
userRoute.delete('/:id', deleteUserById);
userRoute.put('/:id', updateUserById);

export default userRoute;
