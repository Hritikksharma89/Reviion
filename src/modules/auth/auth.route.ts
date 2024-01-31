import { Router } from 'express';

import { getAuthAll, login, register, resetAuthPass } from './auth.controller';

const authRout = Router();

authRout.post('/register', register);
authRout.post('/login', login);
authRout.get('/', getAuthAll);
authRout.post('/reset/:id', resetAuthPass);

export default authRout;
