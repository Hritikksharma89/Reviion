import { Router } from 'express';

import {
  CreateTeam,
  DeleteTeamById,
  GetTeamById,
  GetTeams,
  UpdateTeamById,
} from './team.controller';
import tokenValidate from '../../middleware/tokenValidate';

const teamRoute = Router();

teamRoute.get('/',tokenValidate, GetTeams);
teamRoute.get('/:id',tokenValidate, GetTeamById);
teamRoute.post('/',tokenValidate, CreateTeam);
teamRoute.delete('/:id',tokenValidate, DeleteTeamById);
teamRoute.put('/:id',tokenValidate, UpdateTeamById);

export default teamRoute;
