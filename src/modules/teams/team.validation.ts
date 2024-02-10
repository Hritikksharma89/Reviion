import { z } from 'zod';

const member = z.string();
const project = z.string();

const TeamValidation = {
  createNewTeam: {
    body: z.object({
      name: z.string(),
      Image: z.string().optional(),
      members: z.array(member).optional(),
      projects: z.array(project).optional(),
    }),
    params: z.object({}),
    query: z.object({}),
  },
  deleteTeam: {
    body: z.object({}),
    params: z.object({
      id: z.string().min(24).max(24),
    }),
    query: z.object({}),
  },
  getTeamById: {
    body: z.object({}),
    params: z.object({
      id: z.string().min(24).max(24),
    }),
    query: z.object({}),
  },
  getTeams: {
    body: z.object({}),
    params: z.object({}),
    query: z.object({
      limit: z.string().optional(),
      page: z.string().optional(),
    }),
  },
  updateTeam: {
    body: z.object({
      id: z.string().optional(),
      name: z.string(),
      Image: z.string().optional(),
      members: z.array(member).optional(),
      projects: z.array(project).optional(),
    }),
    params: z.object({
      id: z.string().min(24).max(24),
    }),
    query: z.object({}),
  },
};

export default TeamValidation;
