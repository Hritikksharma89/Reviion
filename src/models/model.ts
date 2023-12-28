import mongoose from 'mongoose';

import { IUser } from '../interface/interfaces';
import { userSchema } from '../schemas/schema';

export const Users = mongoose.models.users || mongoose.model<IUser>('users', userSchema);

// learn bout models , schema, DB connection in typescript
//nodejs crud OP testing  ,jest n all
