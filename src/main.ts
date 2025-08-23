import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const configService = new ConfigService();
  const port = configService.get<number>('PORT') ?? 3000;

  const app = await NestFactory.create(AppModule);

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Setup Swagger
  const documentFactory = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs/swagger', app, documentFactory);

  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`);
  Logger.log(`Swagger documentation available at http://localhost:${port}/docs/swagger`);
}

bootstrap().catch((error) => {
  Logger.error('Error starting application:', error);
  process.exit(1);
});


