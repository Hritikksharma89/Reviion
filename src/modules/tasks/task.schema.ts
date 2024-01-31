import mongoose from 'mongoose';

import { ITask } from './task.interface';

export const taskSchema = new mongoose.Schema<ITask>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: [String], required: true },
  priority: { type: String, enum: ['High', 'Low', 'Medium', 'Urgent'], required: true },
  description: { type: String, required: true },
  timeline: {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  status: {
    type: String,
    enum: ['Pending', 'Not Started', 'Completed', 'Archive', 'Started'],
    required: true,
  },
  assignTo: { type: [String], required: true },
});

//    enum: ['Pending', 'Not Started', 'Completed', 'Archive', 'Started'] why
