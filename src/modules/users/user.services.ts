import mongoose from "mongoose";
import factory from "../../factory";
import { IUser } from "./user.interface";
import { Users } from "./user.model";

const userModel = factory(Users)
export const getAllUsers = (skip?: string, limit?: string, sort?: string): Promise<IUser[]> => userModel.find(skip, limit, sort)
export const getUserById = (_id: mongoose.Types.ObjectId): Promise<IUser> => userModel.findById(_id)
export const createUser = (payload: object): Promise<IUser> => userModel.create(payload)
export const deleteUserById = (_id: mongoose.Types.ObjectId): Promise<IUser> => userModel.deleteById(_id)
export const updateUserById = (_id: mongoose.Types.ObjectId, payload: object): Promise<IUser> => userModel.updateById(_id, payload)
// export const getUserByEmail = (email: string) => userModel.find({ email }) 