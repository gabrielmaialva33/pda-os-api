import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap().then(() =>
  Logger.log(
    `Application is listening on port ${process.env.PORT || 3000}`,
    'Bootstrap',
  ),
);
