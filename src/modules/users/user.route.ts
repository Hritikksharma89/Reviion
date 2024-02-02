import { Router } from 'express';

import tokenValidate from '../../middleware/tokenValidate';
import {
  CreateUser,
  DeleteUserById,
  GetUserById,
  GetUsers,
  UpdateUserById,
} from './user.controller';

const userRoute = Router();

userRoute.get('/', tokenValidate, GetUsers);
userRoute.get('/:id', tokenValidate, GetUserById);
userRoute.post('/', tokenValidate, CreateUser);
userRoute.delete('/:id', tokenValidate, DeleteUserById);
userRoute.put('/:id', tokenValidate, UpdateUserById);

export default userRoute;
