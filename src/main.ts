import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from '@app/app.module';
import { PrismaService } from '@prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap().then(() =>
  Logger.log(
    `Application is listening on port ${process.env.PORT || 3000}`,
    'Bootstrap',
  ),
);
