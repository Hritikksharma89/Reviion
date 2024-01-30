import mongoose from "mongoose";
import factory from "../../utils/factory";
import { IAuth } from "./auth.interface";
import { Auth } from "./auth.model";


const authModel = factory(Auth)
export const getAllAuth = (skip?: string, limit?: string, sort?: string): Promise<IAuth[]> => authModel.find(skip, limit, sort)
export const getAuthById = (_id: mongoose.Types.ObjectId): Promise<IAuth> => authModel.findById(_id)
export const createAuth = (payload: object): Promise<IAuth> => authModel.create(payload)
export const deleteAuthById = (_id: mongoose.Types.ObjectId): Promise<IAuth> => authModel.deleteById(_id)
export const updateAuthById = (_id: mongoose.Types.ObjectId, payload: object): Promise<IAuth> => authModel.updateById(_id, payload)
export const getAuthByEmail = (email: string): Promise<IAuth[]> => authModel.findByEmail(email)