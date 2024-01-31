import { Request, Response } from 'express';
import mongoose from 'mongoose';

import tryCatch from '../../utils/trycatch';
import {
  createTask,
  deleteTaskById,
  getAllTask,
  getTaskById,
  updateTaskById,
} from './task.services';

export const GetTasks = tryCatch(async (req: Request, res: Response) => {
  const { skip, limit, sort } = req.query;
  const tasks = await getAllTask(skip as string, limit as string, sort as string);
  if (tasks.length < 0) {
    res.status(200).json({ message: 'No task found', data: tasks });
  } else {
    res.status(200).json({ message: 'Task fetch successfully', data: tasks });
  }
});

export const GetTaskById = tryCatch(async (req: Request, res: Response) => {
  const _id = new mongoose.Types.ObjectId(req.params.id);
  if (!_id) {
    return res.status(400).json({ message: 'Invalid task ID', data: null });
  }
  const task = await getTaskById(_id);
  if (task) {
    return res.status(200).json({ message: 'Task id found', data: task });
  } else {
    return res.status(404).json({ message: 'No task found', data: task });
  }
});

export const CreateTask = tryCatch(async (req: Request, res: Response) => {
  const task = await createTask(req.body);
  if (task) {
    return res.status(201).json({ message: 'Task created successfully', data: task });
  } else {
    return res.status(204).json({ message: 'Failed to create task', data: task });
  }
});

export const DeleteTaskById = tryCatch(async (req: Request, res: Response) => {
  const _id = new mongoose.Types.ObjectId(req.params.id);
  if (!_id) {
    return res.status(400).json({ message: 'Invalid task ID', data: null });
  }
  const task = await deleteTaskById(_id);
  if (task) {
    return res.status(201).json({ message: 'Task deleted successfully', data: task });
  } else {
    return res.status(204).json({ message: 'Failed to delete task', data: task });
  }
});

export const UpdateTaskById = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const _id = new mongoose.Types.ObjectId(req.params.id);
  const payload = req.body;
  console.log(payload);
  const task = await updateTaskById(_id, payload);
  if (task) {
    return res.status(201).json({ message: 'Task updated successfully', data: task });
  } else {
    return res.status(204).json({ message: 'Failed to update task', data: task });
  }
});

// payload
