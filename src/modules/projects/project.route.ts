import { Router } from "express";
import { GetProjects, CreateProject, DeleteProjectById, GetProjectById, UpdateProjectById } from "./project.controller";


const projectRoute = Router()

projectRoute.get('/', GetProjects)
projectRoute.post('/', CreateProject)
projectRoute.get('/id', DeleteProjectById)
projectRoute.get('/id', GetProjectById)
projectRoute.get('/id', UpdateProjectById)


export default projectRoute