import { Router } from 'express';

import {
  CreateUser,
  DeleteUserById,
  GetUserById,
  GetUsers,
  UpdateUserById,
} from './user.controller';
import tokenValidate from '../../middleware/tokenValidate';

const userRoute = Router();

userRoute.get('/',tokenValidate, GetUsers);
userRoute.get('/:id',tokenValidate, GetUserById);
userRoute.post('/',tokenValidate, CreateUser);
userRoute.delete('/:id',tokenValidate, DeleteUserById);
userRoute.put('/:id',tokenValidate, UpdateUserById);

export default userRoute;
