import { z } from 'zod'
import * as dotenv from 'dotenv'

dotenv.config({
    path:
        process.env.NODE_ENV === 'development'
            ? '.env.development'
            : '.env.production',
})

const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
    PORT: z.string(),
    DATABASE_URL: z.string().url('Invalid database URL'),
    SECRET_KEY: z.string(),
})

export const environment = envSchema.parse(process.env) as z.infer<
    typeof envSchema
>
