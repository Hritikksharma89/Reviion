import { Document } from 'mongoose';

type TRole = 'USER' | 'ADMIN' | 'MANAGER';
type TMembership = 'PREMIUM' | 'FREE' | 'ENTERPRISE';

export interface IUser extends Document {
  id?: number;
  name: string;
  email: string;
  phone: number;
  emailVerified: boolean;
  membership: TMembership;
  role: TRole;
}
