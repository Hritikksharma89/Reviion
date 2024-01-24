
import { Router } from 'express';

import {
  CreateUser, DeleteUserById, GetUserById, UpdateUserById, GetUsers
} from './user.controller';
import validateFactory from '../../validate';
import UserValidation from './user.validation';

const userRoute = Router();

const { getUsers, updateUser, createNewUser, deleteUser, getUserById } = UserValidation

userRoute.get('/', validateFactory(getUsers), GetUsers);
userRoute.get('/:id', validateFactory(getUserById), GetUserById);
userRoute.post('/', validateFactory(createNewUser), CreateUser);
userRoute.delete('/:id', validateFactory(deleteUser), DeleteUserById);
userRoute.put('/:id', validateFactory(updateUser), UpdateUserById);

export default userRoute;
