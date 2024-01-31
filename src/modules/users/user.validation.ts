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
      password: z.string().min(8).optional(),
      phone: z.number().optional(),
      role: z.string().optional(),
    }),
    params: z.object({}),
    query: z.object({}),
  },
  deleteUser: {
    body: {},
    params: z.object({
      id: z.string().optional(),
    }),
    query: {},
  },
  getUserById: {
    body: {},
    params: z.object({
      id: z.string().optional(),
    }),
    query: {},
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
      id: z.string().optional(),
    }),
    query: {},
  },
};

export default UserValidation;
