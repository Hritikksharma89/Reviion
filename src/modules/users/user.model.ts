import mongoose from 'mongoose';

import { IUser } from './user.interface';
import userSchema from './user.schema';

export const Users = mongoose.models.users || mongoose.model<IUser>('users', userSchema);
