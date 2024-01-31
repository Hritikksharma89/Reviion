import mongoose from 'mongoose';

import { IProject } from './project.interface';
import { projectSchema } from './project.schema';

export const Projects =
  mongoose.models.projects || mongoose.model<IProject>('projects', projectSchema);
