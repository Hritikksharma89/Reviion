import mongoose from 'mongoose';

import { IProfile, IUser, IUserOnboarding, IUserSetting } from '../interface/users.interfaces';
import { onboardingSchema, profileSchema, settingsSchema, userSchema } from '../schemas/schema';

export const Users = mongoose.models.users || mongoose.model<IUser>('users', userSchema);

export const Profiles =
  mongoose.models.profiles || mongoose.model<IProfile>('profiles', profileSchema);

export const Settings =
  mongoose.models.settings || mongoose.model<IUserSetting>('settings', settingsSchema);

export const Onboardings =
  mongoose.models.onboardings || mongoose.model<IUserOnboarding>('onboardings', onboardingSchema);
