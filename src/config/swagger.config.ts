import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription('API documentation for NestJS application')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    },
    'JWT-auth',
  )
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    },
    'PAT-auth',
  )
  .addApiKey(
    {
      type: 'apiKey',
      name: 'x-api-key',
      in: 'header',
    },
    'x-api-key',
  )
  .build();

