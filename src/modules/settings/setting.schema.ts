import mongoose from 'mongoose';

import { ISettings } from './setting.interface';

export const SettingsSchema = new mongoose.Schema<ISettings>({
  display: { type: [String], required: true },
  theme: { type: String, required: true },
  notification: {
    notifyMe: { type: String, required: true },
    accountEmail: { type: Boolean, required: true },
    marketingEmail: { type: Boolean, required: true },
    communicationEmail: { type: Boolean, required: true },
  },
  language: { type: String, required: true },
  sidebarState: {
    isCollapsed: { type: Boolean, required: true },
  },
});
