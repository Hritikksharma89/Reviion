import mongoose from 'mongoose';

import factory from '../../utils/factory';
import { ITask } from './task.interface';
import { Tasks } from './task.model';

export const taskModel = factory(Tasks);

export const getAllTask = (skip?: string, limit?: string, sort?: string): Promise<ITask[]> =>
  taskModel.find(skip, limit, sort);
export const getTaskById = (_id: mongoose.Types.ObjectId): Promise<ITask> =>
  taskModel.findById(_id);
export const createTask = (payload: object): Promise<ITask> => taskModel.create(payload);
export const deleteTaskById = (_id: mongoose.Types.ObjectId): Promise<ITask> =>
  taskModel.deleteById(_id);
export const updateTaskById = (_id: mongoose.Types.ObjectId, payload: object): Promise<ITask> =>
  taskModel.updateById(_id, payload);
