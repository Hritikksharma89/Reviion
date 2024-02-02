import { Router } from 'express';

import tokenValidate from '../../middleware/tokenValidate';
import { getAuthAll, login, register, resetAuthPass } from './auth.controller';

const authRout = Router();

authRout.post('/register', register);
authRout.post('/login', login);
authRout.get('/', tokenValidate, getAuthAll);
authRout.post('/reset/:id', resetAuthPass);

export default authRout;
