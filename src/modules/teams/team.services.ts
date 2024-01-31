import mongoose from 'mongoose';

import factory from '../../utils/factory';
import { ITeam } from './team.interface';
import { Teams } from './team.model';

const teamModel = factory(Teams);

export const getAllTeams = (skip?: string, limit?: string, sort?: string): Promise<ITeam[]> =>
  teamModel.find(skip, limit, sort);
export const getTeamById = (_id: mongoose.Types.ObjectId): Promise<ITeam> =>
  teamModel.findById(_id);
export const createTeam = (payload: object): Promise<ITeam> => teamModel.create(payload);
export const deleteTeamById = (_id: mongoose.Types.ObjectId): Promise<ITeam> =>
  teamModel.deleteById(_id);
export const updateTeamById = (_id: mongoose.Types.ObjectId, payload: object): Promise<ITeam> =>
  teamModel.updateById(_id, payload);
