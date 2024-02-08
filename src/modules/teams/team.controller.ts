import { Request, Response } from 'express';
import mongoose from 'mongoose';

import tryCatch from '../../utils/trycatch';
import {
  createTeam,
  deleteTeamById,
  getAllTeams,
  getTeamById,
  updateTeamById,
} from './team.services';
import reqValidate from '../../utils/reqValidate';
import TeamValidation from './team.validation';
import ID from '../../utils/checkIdLength';

export const GetTeams = tryCatch(async (req: Request, res: Response) => {
  const data = await reqValidate(req, TeamValidation.getTeams)
  if (!data.status) return res.json(data.message);
  const { skip, limit, sort } = req.query;
  const teams = await getAllTeams(skip as string, limit as string, sort as string);
  if (teams.length < 0) {
   return res.status(200).json({ message: 'No team found', data: teams });
  } else {
   return res.status(200).json({ message: 'Team fetch successfully', data: teams });
  }
});

export const GetTeamById = tryCatch(async (req: Request, res: Response) => {
  const data = await reqValidate(req, TeamValidation.getTeamById)
    if (!data.status) return res.json(data.message);
  if (!ID(req.params.id)) return res.send({ message: 'user ID not found' });
    const _id = new mongoose.Types.ObjectId(req.params.id);
  if (!_id) {
    return res.status(400).json({ message: 'Invalid team ID', data: null });
  }
  const team = await getTeamById(_id);
  if (team) {
    return res.status(200).json({ message: 'Team id found', data: team });
  } else {
    return res.status(404).json({ message: 'No team found', data: team });
  }
});

export const CreateTeam = tryCatch(async (req: Request, res: Response) => {
  const data = await reqValidate(req, TeamValidation.createNewTeam)
  if (!data.status) return res.json(data.message);
  const team = await createTeam(req.body);
  if (team) {
    return res.status(201).json({ message: 'Team created successfully', data: team });
  } else {
    return res.status(204).json({ message: 'Failed to create team', data: team });
  }
});

export const DeleteTeamById = tryCatch(async (req: Request, res: Response) => {
  const data = await reqValidate(req, TeamValidation.deleteTeam)
  if (!data.status) return res.json(data.message);
  if (!ID(req.params.id)) return res.send({ message: 'user ID not found' });
    const _id = new mongoose.Types.ObjectId(req.params.id);
  if (!_id) {
    return res.status(400).json({ message: 'Invalid team ID', data: null });
  }
  const team = await deleteTeamById(_id);
  if (team) {
    return res.status(201).json({ message: 'Team deleted successfully', data: team });
  } else {
    return res.status(204).json({ message: 'Failed to delete team', data: team });
  }
});

export const UpdateTeamById = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const data = await reqValidate(req, TeamValidation.updateTeam)
  if (!data.status) return res.json(data.message);
  if (!ID(req.params.id)) return res.send({ message: 'user ID not found' });
    const _id = new mongoose.Types.ObjectId(req.params.id);
  const payload = req.body;
  console.log(payload);
  const team = await updateTeamById(_id, payload);
  if (team) {
    return res.status(201).json({ message: 'Team updated successfully', data: team });
  } else {
    return res.status(204).json({ message: 'Failed to update team', data: team });
  }
});

// payload
