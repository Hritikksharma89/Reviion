import {
  AUTH_FORGOT_PASSWORD,
  AUTH_LOGIN,
  AUTH_LOGOUT,




  AUTH_REFRESH_TOKEN,



  AUTH_REGISTER,
  AUTH_RESET_PASSWORD,
} from '@/constant/api.constant'



import { forgotPassword, login, logout, refreshTokens, register, resetPassword } from '@/controller/auth.controller'
import { Router } from 'express'

const authRouter = Router();

authRouter.post(AUTH_REGISTER, register);
authRouter.post(AUTH_LOGIN, login);
authRouter.post(AUTH_LOGOUT, logout);
authRouter.post(AUTH_REFRESH_TOKEN, refreshTokens);
authRouter.post(AUTH_FORGOT_PASSWORD, forgotPassword);
authRouter.post(AUTH_RESET_PASSWORD, resetPassword);

export default authRouter;
