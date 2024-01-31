import { Url } from 'url';

export interface ITeam {
  id: string;
  name: string;
  image: Url;
  members: string[]; // Assuming "objectId" is a string type
  projects: string[];
}
