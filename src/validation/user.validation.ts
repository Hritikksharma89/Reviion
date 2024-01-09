import { z } from 'zod'

export const createUserValidation = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(8),
})
export type UserType = z.infer<typeof createUserValidation>
