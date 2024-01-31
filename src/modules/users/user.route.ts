import { Router } from 'express';

import {
  CreateUser,
  DeleteUserById,
  GetUserById,
  GetUsers,
  UpdateUserById,
} from './user.controller';

const userRoute = Router();

userRoute.get('/', GetUsers);
userRoute.get('/:id', GetUserById);
userRoute.post('/', CreateUser);
userRoute.delete('/:id', DeleteUserById);
userRoute.put('/:id', UpdateUserById);

export default userRoute;
