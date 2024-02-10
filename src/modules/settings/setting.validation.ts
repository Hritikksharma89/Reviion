import { z } from 'zod';

const SettingValidation = {
  createSetting: {
    body: z.object({
      display: z.string().optional(),
      theme: z.string().optional(),
      notification: z.object({
        notifyMe: z.string().optional(),
        accountEmail: z.boolean().optional(),
        marketingEmail: z.boolean().optional(),
        communicationEmail: z.boolean().optional(),
      }),
      language: z.string().optional(),
      sidebarState: z.object({
        isCollapsed: z.boolean().optional(),
      }),
    }),
    params: z.object({}),
    query: z.object({}),
  },
  deleteSetting: {
    body: z.object({}),
    params: z.object({
      id: z.string().min(24).max(24),
    }),
    query: z.object({}),
  },
  getSettingById: {
    body: z.object({}),
    params: z.object({
      id: z.string().min(24).max(24),
    }),
    query: z.object({}),
  },
  getSettings: {
    body: z.object({}),
    params: z.object({}),
    query: z.object({
      limit: z.string().optional(),
      page: z.string().optional(),
    }),
  },
  updateSetting: {
    body: z.object({
      display: z.string().optional(),
      theme: z.string().optional(),
      notification: z.object({
        notifyMe: z.string().optional(),
        accountEmail: z.boolean().optional(),
        marketingEmail: z.boolean().optional(),
        communicationEmail: z.boolean().optional(),
      }),
      language: z.string().optional(),
      sidebarState: z.object({
        isCollapsed: z.boolean().optional(),
      }),
    }),
    params: z.object({
      id: z.string().min(24).max(24),
    }),
    query: z.object({}),
  },
};

export default SettingValidation;
