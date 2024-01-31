import mongoose from 'mongoose';

import { ITeam } from './team.interface';
import { teamSchema } from './team.schema';

export const Teams = mongoose.models.teams || mongoose.model<ITeam>('teams', teamSchema);
