import mongoose from 'mongoose';

export interface ITimeLine {
  start: Date;
  end: Date;
}
export type TPriority = 'High' | 'Low' | 'Medium' | 'Urgent';
export type TStatus = 'Pending' | 'Not Started' | 'Completed' | 'Archive' | 'Started';

export interface ITask {
  id: string;
  name: string;
  category: string[];
  priority: TPriority;
  description: string;
  timeline: ITimeLine;
  status: TStatus;
  assignTo: string[];
}
