import { z } from 'zod';

const category = z.string();

const ProjectValidation = {
  createProject: {
    body: z.object({
      name: z.string(),
      categories: z.array(category).optional(),
      priority: z.string().optional(),
      description: z.string().optional(),
      timeline: z.string().optional(),
      status: z.string().optional(),
      tasklist: z.string().optional(),
      paymentDetails: z.string().optional(),
      assignProject: z.string().optional(),
      body: z.string().optional(),
      repository: z.string().optional(),
    }),
    params: z.object({}),
    query: z.object({}),
  },
  deleteProject: {
    body: z.object({}),
    params: z.object({
      id: z.string().min(24).max(24),
    }),
    query: z.object({}),
  },
  getProjectById: {
    body: z.object({}),
    params: z.object({
      id: z.string().min(24).max(24),
    }),
    query: z.object({}),
  },
  getProjects: {
    body: z.object({}),
    params: z.object({}),
    query: z.object({
      limit: z.string().optional(),
      page: z.string().optional(),
    }),
  },
  updateProject: {
    body: z.object({
      name: z.string(),
      categories: z.array(category).optional(),
      priority: z.string().optional(),
      description: z.string().optional(),
      timeline: z.string().optional(),
      status: z.string().optional(),
      tasklist: z.string().optional(),
      paymentDetails: z.string().optional(),
      assignProject: z.string().optional(),
      body: z.string().optional(),
      repository: z.string().optional(),
    }),
    params: z.object({
      id: z.string().min(24).max(24),
    }),
    query: z.object({}),
  },
};

export default ProjectValidation;
