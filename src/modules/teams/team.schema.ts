import mongoose from 'mongoose';

import { ITeam } from './team.interface';

export const teamSchema = new mongoose.Schema<ITeam>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  members: [{ type: String, required: true }],
  projects: [{ type: String, required: true }],
});
