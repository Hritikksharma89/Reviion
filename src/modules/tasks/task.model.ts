import mongoose from "mongoose";
import { ITask } from "./task.interface";
import { taskSchema } from "./task.schema";




export const Tasks = mongoose.models.tasks || mongoose.model<ITask>('tasks', taskSchema)



//  models vs model and tasks or task