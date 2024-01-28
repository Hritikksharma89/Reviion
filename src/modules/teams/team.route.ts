import { Router } from "express";
import { GetTeams, CreateTeam, DeleteTeamById, GetTeamById, UpdateTeamById } from "./team.controller";


const teamRoute = Router()

teamRoute.get('/', GetTeams)
teamRoute.post('/', CreateTeam)
teamRoute.get('/id', DeleteTeamById)
teamRoute.get('/id', GetTeamById)
teamRoute.get('/id', UpdateTeamById)


export default teamRoute