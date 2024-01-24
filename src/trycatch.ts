import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";


const tryCatch = (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await fn(req,res)
        return next()
    } catch (error) {
        if (error instanceof ZodError) {
            return res.json({ error, message: "Validation Error" })
        }
        return res.send({ message: "Something went wrong", error })
    }
}

export default tryCatch