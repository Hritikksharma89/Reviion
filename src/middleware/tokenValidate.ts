import { NextFunction, Request, Response } from 'express';

import { tokenTypes } from '../modules/auth/auth.constant';
import { getAuthByUserId, verifyToken } from '../modules/auth/auth.services';
import tryCatch from '../utils/trycatch';

const tokenValidate = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
  const verifiedToken = verifyToken(req.headers.authorization as string);
  if (verifiedToken.type !== tokenTypes.ACCESS) return res.send({ message: 'Invalid token ' });
  const getAuth = await getAuthByUserId(verifiedToken.userId);
  const authToken = getAuth[0].token.access.token;
  if (authToken && req.headers.authorization) {
    if ((req.headers.authorization.split(' ')[1] as string) !== authToken)
      return res.send({ message: 'Invalid token ' });
    return next;
  }
});

export default tokenValidate;
