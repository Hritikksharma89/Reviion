import { Document } from 'mongoose';

// Define role and membership types (assuming you have them)
type TRole = string;
type TMembership = string;

// Interface for token
export interface IToken {
  token: string;
  expires: Date;
}

// Interface for tokens
export interface ITokens {
  refresh: IToken;
  access: IToken;
}

// Interface for authentication
export interface IAuth {
  email: string;
  password: string;
  token: ITokens;
  role: TRole;
  membership: TMembership;
  userId: string;
}

export interface IAuthDoc extends IAuth, Document {}
