import { NextFunction, Request, Response } from "express";


const tryCatch = (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await fn(req,res)
        return next()
    } catch (error) {
        res.send({ message: "Something went wrong", error })
    }
}

export default tryCatch