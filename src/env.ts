import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production',
});

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string(),
  DATABASE_URL: z.string().url('Invalid database URL'),
  JWT_SECRET: z.string(),
  BASE_URL:z.string().url('Invalid base URL')

});
export const environment = envSchema.parse(process.env) as z.infer<typeof envSchema>;
