import factory from "../../factory";
import { Users } from "./user.model";

const userModel = factory(Users)
export const getAllUsers = (skip?: string, limit?: string, sort?: string) => userModel.find( skip, limit, sort)
export const getUserById = (_id: string) => userModel.findById(_id)
export const createUser = (payload: object) => userModel.create(payload)
export const deleteUserById = (_id: string) => userModel.deleteById(_id)
export const updateUserById = (_id: string, payload: object) => userModel.updateById(_id, payload)
// export const getUserByEmail = (email: string) => userModel.find({ email }) 