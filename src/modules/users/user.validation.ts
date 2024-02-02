import { z } from 'zod';

/**
 * Defines User validation schemas.
 */
const UserValidation = {
  createNewUser: {
    body: z.object({
      email: z.string(),
      emailVerified: z.boolean().optional(),
      membership: z.string().optional(),
      name: z.string().optional(),
      password: z.string().min(8),
      phone: z.number().optional(),
      role: z.string().optional(),
    }),
    params: z.object({}),
    query: z.object({}),
  },
  deleteUser: {
    body: z.object({}),
    params: z.object({
      id: z.string().min(24).max(24),
    }),
    query: z.object({}),
  },
  getUserById: {
    body: z.object({}),
    params: z.object({
      id: z.string().min(24).max(24),
    }),
    query: z.object({}),
  },
  getUsers: {
    body: z.object({}),
    params: z.object({}),
    query: z.object({
      limit: z.string().optional(),
      page: z.string().optional(),
    }),
  },
  updateUser: {
    body: z.object({
      email: z.string(),
      emailVerified: z.boolean().optional(),
      membership: z.string().optional(),
      name: z.string().optional(),
      password: z.string().min(8).optional(),
      phone: z.number().optional(),
      role: z.string().optional(),
    }),
    params: z.object({
      id: z.string().min(24).max(24),
    }),
    query: z.object({}),
  },
};

export default UserValidation;
