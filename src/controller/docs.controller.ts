import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { options } from '@/config/docsConfig'

const specs = swaggerJsdoc(options);
export const docsServe = swaggerUi.serve;
export const docsSetup = swaggerUi.setup(specs);
