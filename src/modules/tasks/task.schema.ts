import mongoose from 'mongoose';

import { ITask } from './task.interface';

export const taskSchema = new mongoose.Schema<ITask>({
  name: { type: String, required: true },
  category: [{ type: String, required: false }],
  priority: {
    type: String,
    enum: ['High', 'Low', 'Medium', 'Urgent'],
    required: false,
    default: 'Low',
  },
  description: { type: String, required: false },
  timeline: {
    start: { type: Date, required: false, default: new Date() },
    end: { type: Date, required: false },
  },
  status: {
    type: String,
    enum: ['Pending', 'Not Started', 'Completed', 'Archive', 'Started'],
    required: false,
    default: 'Not Started',
  },
  assignTo: [{ type: String, required: false }],
  assignTeam: [{ type: String, required: false }],
});

//    enum: ['Pending', 'Not Started', 'Completed', 'Archive', 'Started'] why
