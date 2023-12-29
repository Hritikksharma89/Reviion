type TMembership = 'PREMIUM' | 'FREE' | 'ENTERPRISE';
type TRole = 'USER' | 'ADMIN' | 'MANAGER';

interface IUser {
  id: string;
  name: string;
  email: string;
  phone: Number;
  emailVerified: boolean;
  membership: TMembership;
  role: TRole;
}
 export default IUser


 