import { environment } from '@/validation/env.validation'

/**
 * CORS options to allow requests from different origins.
 * Sets origin, allowed methods, and enables credentials.
 */
export const corsOptions = {
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  origin: environment.BASE_URL,
}
