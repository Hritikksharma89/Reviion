import { Router } from 'express';

import docsRoute from './v1/docs.route';
import userRoute from './v1/users.route';

const v1Routes = Router();

v1Routes.use('/users/', userRoute);
v1Routes.use('/docs/', docsRoute);

export default v1Routes;
