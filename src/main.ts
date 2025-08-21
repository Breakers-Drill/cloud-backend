import { setupSwagger } from '@config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import envConfig from './config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());

  const corsOrigin = envConfig.APP_CORS_ORIGIN;
  app.enableCors({
    origin: corsOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type, Accept, Authorization'],
    exposedHeaders: ['Authorization'],
  });

  app.setGlobalPrefix('/cloud');
  setupSwagger(app);
  await app.listen(envConfig.APP_PORT);
}
void bootstrap();
