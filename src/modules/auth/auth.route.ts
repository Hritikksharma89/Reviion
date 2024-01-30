import { Router } from "express";
import { getAuthAll, login, register } from "./auth.controller";



const authRout = Router()

authRout.post('/register',register )
authRout.post('/login',login )
authRout.get('/',getAuthAll )

export default authRout
