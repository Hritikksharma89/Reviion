import { Request, Response } from "express";
import tryCatch from "../../utils/trycatch";
import { createUser, getUserByEmail, getUserById } from "../users/user.services";
import { createAuth, getAllAuth, getAuthByEmail } from "./auth.services";
import CryptoFactory from "../../utils/crypto.factory";
import mongoose from "mongoose";



export const register = tryCatch(async (req: Request, res: Response) => {
    const { email, password, name, phone } = req.body
    const isUser = await getUserByEmail(email)
    if (isUser.length !== 0) return res.send({ message: 'Email already taken' })
    
    const userPayload = { name, email, emailVerified: false, phone, membership: "Free", role: "User" }
    const createNewUser = await createUser(userPayload)
    const authPayload = { email, password: CryptoFactory().encryptedPassword(password), userId: createNewUser._id, phone: createNewUser.phone, membership: createNewUser.membership, role: createNewUser.role }
    const createNewAuth = await createAuth(authPayload)
    return res.send({ createNewUser, createNewAuth })
})

export const login = tryCatch(async (req: Request, res: Response) => {
    const { email, password } = req.body
    const isAuth = await getAuthByEmail(email)
    if (isAuth.length == 0) return res.send({ message: 'Email is incorrect' })

    const isValidPass = CryptoFactory().comparePassword(password, isAuth[0].password)
    if (!isValidPass) return res.send({ message: 'Password is incorrect' })
    const id = new mongoose.Types.ObjectId(isAuth[0].userId)
    const user = await getUserById(id)

    // if (!user ) return res.send({message:"user not found" , user , isAuth})
    return res.send({user, isAuth , isValidPass , id})
}) 

export const getAuthAll = tryCatch(async (req: Request, res: Response) => {
    const { skip, limit, sort } = req.query;
    const auth = await getAllAuth(skip as string, limit as string, sort as string)
    if (auth.length < 0) {
      res.status(200).json({ message: 'No auth found', data: auth });
    } else {
      res.status(200).json({ message: 'Auth fetch successfully', data: auth });
    }
  })
  