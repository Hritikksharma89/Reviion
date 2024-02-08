import mongoose from 'mongoose';

import { IProject } from './project.interface';

export const projectSchema = new mongoose.Schema<IProject>({
  name: { type: String, required: true },
  category: { type: [String], required: false },
  priority: { type: String, enum: ['High', 'Low', 'Medium', 'Urgent'], required: false },
  description: { type: String, required: false },
  timeline: {
    start: { type: Date, required: false },
    end: { type: Date, required: false },
  },
  status: {
    type: String,
    enum: ['Pending', 'Not Started', 'Completed', 'Archive', 'Started'],
    required: false, default: 'Not Started'
  },
  taskList: { type: [String], required: false },
  paymentDetails: { type: [String], required: false },
  assignTeam: { type: [String], required: false },
  body: { type: String, required: false },
  repository: { type: String, required: false }, // Assuming "Url" is a string type
});


// enum and default in mongoDb
