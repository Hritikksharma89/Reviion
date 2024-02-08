import { Router } from 'express';

import {
  CreateTask,
  DeleteTaskById,
  GetTaskById,
  GetTasks,
  UpdateTaskById,
} from './task.controller';
import tokenValidate from '../../middleware/tokenValidate';

const taskRoute = Router();

taskRoute.get('/', tokenValidate, GetTasks);
taskRoute.post('/', tokenValidate, CreateTask);
taskRoute.delete('/:id', tokenValidate, DeleteTaskById);
taskRoute.get('/:id', tokenValidate, GetTaskById);
taskRoute.put('/:id', tokenValidate, UpdateTaskById);

export default taskRoute;
