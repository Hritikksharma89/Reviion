import mongoose from "mongoose";
import { ISettings } from "./setting.interface";
import { SettingsSchema } from "./setting.schema";



export const Settings = mongoose.models.settings || mongoose.model<ISettings>('tasks', SettingsSchema)
