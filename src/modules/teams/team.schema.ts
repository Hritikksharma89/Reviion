import mongoose from 'mongoose';

import { ITeam } from './team.interface';

export const teamSchema = new mongoose.Schema<ITeam>({
  name: { type: String, required: true },
  image: { type: String, required: false },
  members: [{ type: String, required: false }],
  projects: [{ type: String, required: false }],
});
