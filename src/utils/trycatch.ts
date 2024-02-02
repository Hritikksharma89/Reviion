import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

class BSONError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BSONError';
  }
}

const tryCatch = (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res);
    return next();
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return res.json({ error: error.errors, message: 'Validation Error' });
    }
    if (error instanceof BSONError) {
      return res.json({ error });
    }

    return res.send({ message: 'Something went wrong', error });
  }
};

export default tryCatch;
