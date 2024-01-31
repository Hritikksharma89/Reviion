import mongoose from 'mongoose';

import factory from '../../utils/factory';
import { IAuth, IAuthDoc } from './auth.interface';
import { Auth } from './auth.model';
import TokenFactory from '../../utils/token.factory';
import { tokenTypes } from './auth.constant';

const authModel = factory(Auth);
export const getAllAuth = (skip?: string, limit?: string, sort?: string): Promise<IAuth[]> =>
  authModel.find(skip, limit, sort);
export const getAuthById = (_id: mongoose.Types.ObjectId): Promise<IAuth> =>
  authModel.findById(_id);
export const createAuth = (payload: object): Promise<IAuth> => authModel.create(payload);
export const deleteAuthById = (_id: mongoose.Types.ObjectId): Promise<IAuth> =>
  authModel.deleteById(_id);
export const updateAuthById = (_id: mongoose.Types.ObjectId, payload: object): Promise<IAuthDoc> =>
  authModel.updateById(_id, payload);
export const getAuthByEmail = (email: string): Promise<IAuthDoc[]> => authModel.findByEmail(email);
export const getAuthByUserId = (userId: mongoose.Types.ObjectId): Promise<IAuthDoc[]> =>
  authModel.findByUserId(userId);



export const generateAuthTokens = async (id: mongoose.Types.ObjectId, role: string) => {
  return {
    access: {
      expires: TokenFactory().accessExpire.toDate(),
      token: TokenFactory().generate(id, role, TokenFactory().accessExpire, tokenTypes.ACCESS),
    },
    refresh: {
      expires: TokenFactory().refreshExpire.toDate(),
      token: TokenFactory().generate(
        id,
        role,
        TokenFactory().refreshExpire,
        tokenTypes.REFRESH,
      ),
    },
  }
}



export const verifyToken = (token: string) => TokenFactory().verify(token.split(' ')[1])







