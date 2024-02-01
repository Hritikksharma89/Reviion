import { Router } from 'express';

import { getAuthAll, login, register, resetAuthPass } from './auth.controller';
import tokenValidate from '../../middleware/tokenValidate';

const authRout = Router();

authRout.post('/register', register);
authRout.post('/login', login);
authRout.get('/', tokenValidate, getAuthAll);
authRout.post('/reset/:id', resetAuthPass);

export default authRout;
