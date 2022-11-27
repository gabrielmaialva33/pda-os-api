import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@src/modules/app/app.module';
import { useContainer } from 'class-validator';
import { CommonModule } from '@common/common.module';
import { ValidationPipeConfig } from '@src/config/validation.pipe.config';
import { LoggerMiddleware } from '@src/middleware/logger.middleware';
import { LoggerModule } from '@logger/logger.module';
import { LoggerService } from '@logger/services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const fastify = app.getHttpAdapter().getInstance();
  fastify.addHook('onRequest', async (request, reply) => {
    await new LoggerMiddleware(
      app.select(LoggerModule).get(LoggerService),
    ).onRequest(request, reply);
  });

  useContainer(app.select(CommonModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe(ValidationPipeConfig));
  app.enableCors();

  await app.listen(process.env.PORT || 3333, process.env.HOST || '0.0.0.0');
}

bootstrap().then(() =>
  Logger.log(
    `Application is listening on port ${process.env.PORT || 3333}`,
    'Bootstrap',
  ),
);
