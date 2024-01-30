import mongoose from "mongoose";
import { authSchema } from "./auth.schema";
import { IAuth } from "./auth.interface";




export const Auth = mongoose.models.auth || mongoose.model<IAuth>('auth', authSchema)