import 'dotenv/config';
import * as process from 'process';

import { NestFactory } from '@nestjs/core';

import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import compression from '@fastify/compress';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';

import { AppModule } from '@/app.module';
import { AppUtils } from '@common/helpers';
import { ZodValidationPipe } from '@lib/zod/pipe.zod';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  AppUtils.killAppWithGrace(app);

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
   * Global Config
   * ------------------------------------------------------
   */
  app.enableShutdownHooks();

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({ detailedErrors: false }),
  );

  app.useGlobalPipes(new ZodValidationPipe());

  await app.listen(process.env.PORT || 3333, '0.0.0.0');
}

(async () =>
  await bootstrap().then(() =>
    Logger.log(
      `Application is listening on port ${
        process.env.PORT || 3333
      } in environment ${process.env.NODE_ENV}`,
      'Bootstrap',
    ),
  ))();
