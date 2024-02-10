import { ITimeLine, TPriority, TStatus } from '../tasks/task.interface';

export interface IProject {
  id: string;
  name: string;
  categories: string[];
  priority: TPriority;
  description: string;
  timeline: ITimeLine;
  status: TStatus;
  taskList: string[];
  paymentDetails: string[];
  assignTeam: string[];
  body: string;
  repository: URL;
}
