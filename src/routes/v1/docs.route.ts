import { Router } from 'express'
import { docsServe, docsSetup } from '@/controller/docs.controller'
import { DOCS } from '@/constant/api.constant'

const docsRoute = Router();

docsRoute.use(DOCS, docsServe, docsSetup);

export default docsRoute;
