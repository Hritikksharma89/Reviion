import { environment } from '@/validation/env.validation'

/**
 * Options for Swagger docs generation.
 */
export const options = {
  apis: ['./src/routes/**/*.ts', './src/schemas/**/*.ts'],
  swaggerDefinition: {
    info: {
      description:
        'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
      title: 'API Manager',
      version: '1.0.0',
    },
    openapi: '3.0.0',
    servers: [
      {
        description: 'Development server',
        url: environment.BASE_URL,
      },
    ],
  },
}
