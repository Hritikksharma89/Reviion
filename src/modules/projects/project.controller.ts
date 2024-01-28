import mongoose from "mongoose";
import { Request, Response } from "express";
import tryCatch from "../../trycatch";
import { createProject, deleteProjectById, getAllProject, getProjectById, updateProjectById } from "./project.services";




export const GetProjects = tryCatch(async (req: Request, res: Response) => {
    const { skip, limit, sort } = req.query;
    const projects = await getAllProject(skip as string, limit as string, sort as string)
    if (projects.length < 0) {
        res.status(200).json({ message: 'No project found', data: projects });
    } else {
        res.status(200).json({ message: 'Project fetch successfully', data: projects });
    }
})

export const GetProjectById = tryCatch(async (req: Request, res: Response) => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    if (!_id) {
        return res.status(400).json({ message: 'Invalid project ID', data: null });
    }
    const project = await getProjectById(_id)
    if (project) {
        return res.status(200).json({ message: 'Project id found', data: project });
    } else {
        return res.status(404).json({ message: 'No project found', data: project });
    }
})

export const CreateProject = tryCatch(async (req: Request, res: Response) => {
    const project = await createProject(req.body);
  if (project) {
    return res.status(201).json({ message: 'Project created successfully', data: project });
  } else {
    return res.status(204).json({ message: 'Failed to create project', data: project });
  }
})

export const DeleteProjectById = tryCatch (async (req: Request, res: Response) => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    if (!_id) {
        return res.status(400).json({ message: 'Invalid project ID', data: null });
    }
    const project = await deleteProjectById(_id);
    if (project) {
      return res.status(201).json({ message: 'Project deleted successfully', data: project });
    } else {
      return res.status(204).json({ message: 'Failed to delete project', data: project });
    }
  })

  export const UpdateProjectById = tryCatch(async (req: Request, res: Response): Promise<any> => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    const payload = req.body;
    console.log(payload);
    const project = await updateProjectById(_id, payload);
    if (project) {
      return res.status(201).json({ message: 'Project updated successfully', data: project });
    } else {
      return res.status(204).json({ message: 'Failed to update project', data: project });
    }
  })


  // payload 
  