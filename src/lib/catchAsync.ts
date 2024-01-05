import { NextFunction, Request, Response } from 'express'

const catchAsync = (fn: any) => {
  const middle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paramFunc = await fn(req, res, next)
      return paramFunc
    } catch (error: any) {
      next(error)
    }
  }
  return middle
}
export default catchAsync
