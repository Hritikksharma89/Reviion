import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import options from './docs.options';

const docsRoute = Router();
const specs = swaggerJsdoc(options);
docsRoute.use('/', swaggerUi.serve, swaggerUi.setup(specs));

export default docsRoute;
