import { Router } from 'express';

import {
  CreateProject,
  DeleteProjectById,
  GetProjectById,
  GetProjects,
  UpdateProjectById,
} from './project.controller';

const projectRoute = Router();

projectRoute.get('/', GetProjects);
projectRoute.post('/', CreateProject);
projectRoute.get('/id', DeleteProjectById);
projectRoute.get('/id', GetProjectById);
projectRoute.get('/id', UpdateProjectById);

export default projectRoute;
