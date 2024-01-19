import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production',
});

/**
 * Schema for validating environment variables.
 */
const envSchema = z.object({
  BASE_URL: z.string().url('Invalid Base URL'),
  DATABASE_URL: z.string().url('Invalid database URL'),
  JWT_ACCESS_EXPIRATION_MINUTES: z.string(),
  JWT_REFRESH_EXPIRATION_DAYS: z.string(),
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: z.string(),
  JWT_SECRET: z.string(),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PASS_SECRET: z.string(),
  PORT: z.string(),
});

export const environment = envSchema.parse(process.env);
