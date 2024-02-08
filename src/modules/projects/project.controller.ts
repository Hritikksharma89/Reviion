import { Request, Response } from 'express';
import mongoose from 'mongoose';

import tryCatch from '../../utils/trycatch';
import {
  createProject,
  deleteProjectById,
  getAllProject,
  getProjectById,
  updateProjectById,
} from './project.services';
import reqValidate from '../../utils/reqValidate';
import ProjectValidation from './project.validation';
import ID from '../../utils/checkIdLength';

export const GetProjects = tryCatch(async (req: Request, res: Response) => {
  const data = await reqValidate(req, ProjectValidation.getProjects)
  if (!data.status) return res.json(data.message);
  const { skip, limit, sort } = req.query;
  const projects = await getAllProject(skip as string, limit as string, sort as string);
  if (projects.length < 0) {
    return res.status(200).json({ message: 'No project found', data: projects });
  } else {
    return res.status(200).json({ message: 'Project fetch successfully', data: projects });
  }
});

export const GetProjectById = tryCatch(async (req: Request, res: Response) => {
  const data = await reqValidate(req, ProjectValidation.getProjectById)
  if (!data.status) return res.json(data.message);
  if (!ID(req.params.id)) return res.send({ message: 'user ID not found' });
  const _id = new mongoose.Types.ObjectId(req.params.id);
  if (!_id) {
    return res.status(400).json({ message: 'Invalid project ID', data: null });
  }
  const project = await getProjectById(_id);
  if (project) {
    return res.status(200).json({ message: 'Project id found', data: project });
  } else {
    return res.status(404).json({ message: 'No project found', data: project });
  }
});

export const CreateProject = tryCatch(async (req: Request, res: Response) => {
  const data = await reqValidate(req, ProjectValidation.createProject)
  if (!data.status) return res.json(data.message);
  const project = await createProject(req.body);
  if (project) {
    return res.status(201).json({ message: 'Project created successfully', data: project });
  } else {
    return res.status(204).json({ message: 'Failed to create project', data: project });
  }
});

export const DeleteProjectById = tryCatch(async (req: Request, res: Response) => {
  const data = await reqValidate(req, ProjectValidation.deleteProject)
  if (!data.status) return res.json(data.message);
  if (!ID(req.params.id)) return res.send({ message: 'user ID not found' });
  const _id = new mongoose.Types.ObjectId(req.params.id);
  if (!_id) {
    return res.status(400).json({ message: 'Invalid project ID', data: null });
  }
  const project = await deleteProjectById(_id);
  if (project) {
    return res.status(201).json({ message: 'Project deleted successfully', data: project });
  } else {
    return res.status(204).json({ message: 'Failed to delete project', data: project });
  }
});

export const UpdateProjectById = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const data = await reqValidate(req, ProjectValidation.updateProject)
  if (!data.status) return res.json(data.message);
  if (!ID(req.params.id)) return res.send({ message: 'user ID not found' });
  const _id = new mongoose.Types.ObjectId(req.params.id);
  const payload = req.body;
  console.log(payload);
  const project = await updateProjectById(_id, payload);
  if (project) {
    return res.status(201).json({ message: 'Project updated successfully', data: project });
  } else {
    return res.status(204).json({ message: 'Failed to update project', data: project });
  }
});


