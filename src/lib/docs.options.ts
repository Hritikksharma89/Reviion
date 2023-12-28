const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for Your API',
    },
  },
  apis: ['./src/routes/*.ts'], // Your TypeScript route files
};

export default options;
