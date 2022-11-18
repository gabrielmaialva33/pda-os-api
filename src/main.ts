import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';

import { AppModule } from '@app/app.module';
import { PrismaService } from '@prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors();

  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);

  await app.listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0');
}

bootstrap().then(() =>
  Logger.log(
    `Application is listening on port ${process.env.PORT || 3000}`,
    'Bootstrap',
  ),
);
