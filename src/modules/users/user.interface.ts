import { Document } from 'mongoose';
import { Url } from 'url';

export type TRole = 'User' | 'Admin' | 'Employee';
export type TMembership = 'Premium' | 'Free' | 'Enterprise';
export interface ISocial {
  name: string;
  url: Url;
}

export interface IUser {
  name: string;
  image: Url;
  email: string;
  phone: number;
  password: string;
  emailVerified: boolean;
  bio: string;
  socials: ISocial[];
  dob: Date;
  language: string;
  role: TRole;
  membership: TMembership;
  projects: string[];
  teams: string[];
  tasks: string[];
  onboarding: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUserDoc extends IUser, Document {}
