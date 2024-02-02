import { Request, Response } from 'express';
import mongoose from 'mongoose';

import ID from '../../utils/checkIdLength';
import CryptoFactory from '../../utils/crypto.factory';
import reqValidate from '../../utils/reqValidate';
import tryCatch from '../../utils/trycatch';
import { createUser, getUserByEmail, getUserById } from '../users/user.services';
import {
  createAuth,
  generateAuthTokens,
  getAllAuth,
  getAuthByEmail,
  getAuthByUserId,
  updateAuthById,
} from './auth.services';
import AuthValidation from './auth.validation';

export const register = tryCatch(async (req: Request, res: Response) => {
  const data = await reqValidate(req, AuthValidation.register);
  if (!data.error) return res.json(data.error);
  const { email, password, name, phone } = req.body;
  const isUser = await getUserByEmail(email);
  if (isUser.length !== 0) return res.send({ message: 'Email already taken' });
  const userPayload = {
    name,
    email,
    emailVerified: false,
    phone,
    membership: 'Free',
    role: 'User',
  };
  const createNewUser = await createUser(userPayload);
  const authPayload = {
    email,
    password: CryptoFactory().encryptedPassword(password),
    userId: createNewUser._id,
    phone: createNewUser.phone,
    membership: createNewUser.membership,
    role: createNewUser.role,
  };
  const createNewAuth = await createAuth(authPayload);
  return res.send({ createNewUser, createNewAuth });
});

export const login = tryCatch(async (req: Request, res: Response) => {
  const data = await reqValidate(req, AuthValidation.login);
  if (!data.error) return res.json(data.error);
  const { email, password } = req.body;
  const isAuth = await getAuthByEmail(email);
  if (isAuth.length == 0) return res.send({ message: 'Email is incorrect' });
  const isValidPass = CryptoFactory().comparePassword(password, isAuth[0].password);
  if (!isValidPass) return res.send({ message: 'Password is incorrect' });
  if (!ID(isAuth[0].userId)) return res.send({ message: 'user ID incorrect' });
  const id = new mongoose.Types.ObjectId(isAuth[0].userId);
  const user = await getUserById(id);
  if (!user) return res.send({ message: 'user not found' });
  const token = await generateAuthTokens(user._id, user.role);
  const updateAuth = await updateAuthById(isAuth[0]._id, { token });
  return res.send({ message: 'Login successful', data: updateAuth });
});

export const resetAuthPass = tryCatch(async (req: Request, res: Response) => {
  const data = await reqValidate(req, AuthValidation.resetAuthPass);
  if (!data.error) return res.json(data.error);
  const { password, newPassword } = req.body;
  if (!ID(req.params.id)) return res.send({ message: 'user ID not found' });
  const userId = new mongoose.Types.ObjectId(req.params.id);
  const auth = await getAuthByUserId(userId);
  if (!auth) return res.send({ message: 'user not found' });
  const isValidPass = CryptoFactory().comparePassword(password, auth[0].password);
  if (!isValidPass) return res.send({ message: 'Password is incorrect' });
  const updatePass = await updateAuthById(auth[0]._id, {
    password: CryptoFactory().encryptedPassword(newPassword),
  });
  return res.status(200).json({ message: 'Password updated successfully', updatePass });
});

export const getAuthAll = tryCatch(async (req: Request, res: Response) => {
  const data = await reqValidate(req, AuthValidation.getAuthAll);
  if (!data.error) return res.json(data.error);
  const { skip, limit, sort } = req.query;
  const auth = await getAllAuth(skip as string, limit as string, sort as string);
  if (auth.length < 0) return res.status(200).json({ message: 'No auth found', data: auth });
  return res.status(200).json({ message: 'Auth fetch successfully', data: auth });
});
