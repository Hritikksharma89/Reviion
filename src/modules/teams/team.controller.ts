import { Request, Response } from "express";
import tryCatch from "../../trycatch";
import { createTeam, deleteTeamById, getAllTeams, getTeamById, updateTeamById } from "./team.services";
import mongoose from "mongoose";


export const GetTeams = tryCatch(async (req: Request, res: Response) => {
    const { skip, limit, sort } = req.query;
    const teams = await getAllTeams(skip as string, limit as string, sort as string)
    if (teams.length < 0) {
        res.status(200).json({ message: 'No team found', data: teams });
    } else {
        res.status(200).json({ message: 'Team fetch successfully', data: teams });
    }
})

export const GetTeamById = tryCatch(async (req: Request, res: Response) => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    if (!_id) {
        return res.status(400).json({ message: 'Invalid team ID', data: null });
    }
    const team = await getTeamById(_id)
    if (team) {
        return res.status(200).json({ message: 'Team id found', data: team });
    } else {
        return res.status(404).json({ message: 'No team found', data: team });
    }
})

export const CreateTeam = tryCatch(async (req: Request, res: Response) => {
    const team = await createTeam(req.body);
  if (team) {
    return res.status(201).json({ message: 'Team created successfully', data: team });
  } else {
    return res.status(204).json({ message: 'Failed to create team', data: team });
  }
})

export const DeleteTeamById = tryCatch (async (req: Request, res: Response) => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    if (!_id) {
        return res.status(400).json({ message: 'Invalid team ID', data: null });
    }
    const team = await deleteTeamById(_id);
    if (team) {
      return res.status(201).json({ message: 'Team deleted successfully', data: team });
    } else {
      return res.status(204).json({ message: 'Failed to delete team', data: team });
    }
  })

  export const UpdateTeamById = tryCatch(async (req: Request, res: Response): Promise<any> => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    const payload = req.body;
    console.log(payload);
    const team = await updateTeamById(_id, payload);
    if (team) {
      return res.status(201).json({ message: 'Team updated successfully', data: team });
    } else {
      return res.status(204).json({ message: 'Failed to update team', data: team });
    }
  })


  // payload 
  