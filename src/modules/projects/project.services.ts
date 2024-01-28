import mongoose from "mongoose"
import factory from "../../factory"
import { IProject } from "./project.interface"
import { Projects } from "./project.model"





export const projectModel = factory(Projects)

export const getAllProject = (skip?: string, limit?: string, sort?: string):Promise<IProject[]> => projectModel.find(skip, limit, sort)
export const getProjectById = (_id: mongoose.Types.ObjectId):Promise<IProject> => projectModel.findById(_id)
export const createProject = (payload: object): Promise<IProject> => projectModel.create(payload)
export const deleteProjectById = (_id: mongoose.Types.ObjectId): Promise<IProject> => projectModel.deleteById(_id)
export const updateProjectById = (_id: mongoose.Types.ObjectId, payload: object): Promise<IProject> => projectModel.updateById(_id, payload)
