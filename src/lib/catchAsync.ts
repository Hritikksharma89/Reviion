import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

const catchAsync = (fn: any) => {
  const middle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paramFunc = await fn(req, res, next)
      return paramFunc
    } catch (error: any) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal Server Error', data: [], error: error })
    } finally {
      next()
    }
  }
  return middle
}
export default catchAsync
