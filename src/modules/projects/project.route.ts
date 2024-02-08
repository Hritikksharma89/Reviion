import { Router } from 'express';

import {
  CreateProject,
  DeleteProjectById,
  GetProjectById,
  GetProjects,
  UpdateProjectById,
} from './project.controller';
import tokenValidate from '../../middleware/tokenValidate';

const projectRoute = Router();

projectRoute.get('/',tokenValidate, GetProjects);
projectRoute.post('/',tokenValidate, CreateProject);
projectRoute.delete('/:id',tokenValidate, DeleteProjectById);
projectRoute.get('/:id',tokenValidate, GetProjectById);
projectRoute.put('/:id',tokenValidate, UpdateProjectById);

export default projectRoute;
