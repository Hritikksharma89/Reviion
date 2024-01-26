import mongoose from "mongoose";
import { IProject } from "./project.interface";





export const projectSchema = new mongoose.Schema<IProject>({
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
    taskList: { type: [String], required: true },
    paymentDetails: { type: [String], required: true },
    assignTeam: { type: [String], required: true },
    body: { type: String, required: true },
    repository: { type: String, required: true }, // Assuming "Url" is a string type
  });
  