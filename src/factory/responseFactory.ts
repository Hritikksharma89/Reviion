import { Response } from 'express'
import httpStatus from 'http-status'

/**
 * Creates a response factory function that generates
 * response payloads for common status codes.
 */
const ResponseFactory = (res: Response) => ({
  badRequest: (data: any = {}, message: string = 'Bad Request') =>
    res.status(httpStatus.BAD_REQUEST).json({ data, message }),

  conflict: (data: any = {}, message: string = '  already exists') =>
    res.status(httpStatus.CONFLICT).json({ data, message }),

  forbidden: (data: any = {}, message: string = 'Forbidden') =>
    res.status(httpStatus.FORBIDDEN).json({ data, message }),

  internalServerError: (data: any = {}, message: string = '  Server Error') =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ data, message }),

  notFound: (data: any = {}, message: string = '  not found') =>
    res.status(httpStatus.NOT_FOUND).json({ data, message }),

  success: (data: any = {}, message: string = '  Fetched successfully') =>
    res.status(httpStatus.OK).json({ data, message }),

  successCreated: (data: any = {}, message: string = 'created') =>
    res.status(httpStatus.CREATED).json({ data, message }),

  unauthorized: (data: any = {}, message: string = 'Unauthorized access') =>
    res.status(httpStatus.UNAUTHORIZED).json({ data, message }),
})
export default ResponseFactory
