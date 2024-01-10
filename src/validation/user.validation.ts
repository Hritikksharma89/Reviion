import { z } from 'zod'

export const createUserValidation = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(8),
})

export const updateUserValidation = z.object({
  name: z.string().optional(),
  email: z.string(),
  phone: z.number().optional(),
  emailVerified: z.boolean().optional(),
  membership: z.string().optional(),
  role: z.string().optional(),
  password: z.string().min(8).optional(),
})
