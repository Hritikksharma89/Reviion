import { Router } from 'express';

import {
  CreateTask,
  DeleteTaskById,
  GetTaskById,
  GetTasks,
  UpdateTaskById,
} from './task.controller';

const taskRoute = Router();

taskRoute.get('/', GetTasks);
taskRoute.post('/', CreateTask);
taskRoute.get('/id', DeleteTaskById);
taskRoute.get('/id', GetTaskById);
taskRoute.get('/id', UpdateTaskById);

export default taskRoute;
