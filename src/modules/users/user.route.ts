
import { Router } from 'express';

import {
  CreateUser,DeleteUserById,GetUserById,UpdateUserById,getUsers
} from './user.controller';

const userRoute = Router();

userRoute.get('/', getUsers);
userRoute.get('/:id', GetUserById);
userRoute.post('/', CreateUser);
userRoute.delete('/:id', DeleteUserById);
userRoute.put('/:id', UpdateUserById);

export default userRoute;
