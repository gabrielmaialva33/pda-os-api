import 'dotenv/config';

import { useContainer } from 'class-validator';
import helmet from '@fastify/helmet';
import compression from '@fastify/compress';

import { NestFactory } from '@nestjs/core';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';

import { ValidationPipeConfig } from '@src/config/validation.pipe.config';

import { AppModule } from '@src/app.module';
import { CommonModule } from '@common/common.module';
import { LoggerMiddleware } from '@src/middleware/logger.middleware';

import { LoggerModule } from '@logger/logger.module';
import { LoggerService } from '@logger/services/logger.service';
import { UserModule } from '@user/user.module';
import { UserService } from '@user/services/user.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  /**
   * ------------------------------------------------------
   * Security
   * ------------------------------------------------------
   */
  await app.register(helmet);
  await app.register(compression);
  app.enableCors();

  /**
   * ------------------------------------------------------
   * Middleware
   * ------------------------------------------------------
   */
  const fastify = app.getHttpAdapter().getInstance();
  fastify.addHook(
    'onRequest',
    async (request: FastifyRequest, reply: FastifyReply) => {
      await new LoggerMiddleware(
        app.select(LoggerModule).get(LoggerService),
        app.select(UserModule).get(UserService),
      ).onRequest(request, reply);
    },
  );

  /**
   * ------------------------------------------------------
   * Global Config
   * ------------------------------------------------------
   */
  app.useGlobalPipes(new ValidationPipe(ValidationPipeConfig));

  useContainer(app.select(CommonModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT || 3333, process.env.HOST || '0.0.0.0');
}

bootstrap().then(() =>
  Logger.log(
    `Application is listening on port ${process.env.PORT || 3333}`,
    'Bootstrap',
  ),
);
