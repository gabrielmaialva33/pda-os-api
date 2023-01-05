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
import fastifyStatic from '@fastify/static';
import { contentParser } from 'fastify-multer';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';

import { AppModule } from '@/app.module';
import { AppUtils } from '@common/helpers';
import { ZodValidationPipe } from '@lib/zod/pipe.zod';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ ignoreTrailingSlash: true }),
    { bufferLogs: true },
  );

  AppUtils.killAppWithGrace(app);

  /**
   * ------------------------------------------------------
   * Security
   * ------------------------------------------------------
   */
  await app.register(helmet);
  await app.register(compression, {
    global: true,
    threshold: 1,
    encodings: ['gzip', 'deflate'],
  });
  await app.register(contentParser);
  app.enableCors();

  await app.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

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

  await app
    .listen(process.env.PORT || 3333, '0.0.0.0')
    .then(async () =>
      Logger.log(
        `Application is running on: ${await app.getUrl()}`,
        'Bootstrap',
      ),
    );
}

(async () => await bootstrap())();
