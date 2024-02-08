import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production',
});

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string(),
  DATABASE_URL: z.string().url('Invalid database URL'),
  PASS_SECRET: z.string(),
  BASE_URL: z.string().url('Invalid base URL'),
  JWT_ACCESS_EXPIRATION_MINUTES: z.string(),
  JWT_REFRESH_EXPIRATION_DAYS: z.string(),
  JWT_SECRET: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
  EMAIL_FROM: z.string(),

});
export const environment = envSchema.parse(process.env) as z.infer<typeof envSchema>;
