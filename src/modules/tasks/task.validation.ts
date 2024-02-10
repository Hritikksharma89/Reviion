import { z } from 'zod';

const assign = z.string();

const TaskValidation = {
  createTask: {
    body: z.object({
      name: z.string(),
      category: z.string().optional(),
      priority: z.string().optional(),
      description: z.string().optional(),
      timeline: z.string().optional(),
      status: z.string().optional(),
      assignTo: z.array(assign).optional(),
      assignTeam: z.array(assign).optional(),
    }),
    params: z.object({}),
    query: z.object({}),
  },
  deleteTask: {
    body: z.object({}),
    params: z.object({
      id: z.string().min(24).max(24),
    }),
    query: z.object({}),
  },
  getTaskById: {
    body: z.object({}),
    params: z.object({
      id: z.string().min(24).max(24),
    }),
    query: z.object({}),
  },
  getTasks: {
    body: z.object({}),
    params: z.object({}),
    query: z.object({
      limit: z.string().optional(),
      page: z.string().optional(),
    }),
  },
  updateTask: {
    body: z.object({
      name: z.string(),
      category: z.string().optional(),
      priority: z.string().optional(),
      description: z.string().optional(),
      timeline: z.string().optional(),
      status: z.string().optional(),
      assignTo: z.array(assign).optional(),
      assignTeam: z.array(assign).optional(),
    }),
    params: z.object({
      id: z.string().min(24).max(24),
    }),
    query: z.object({}),
  },
};

export default TaskValidation;
