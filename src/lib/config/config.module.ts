import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { validateEnv, ValidateSchema } from '@lib/config/validate.config';
import { database } from '@lib/config/database.config';
import { jwt } from '@lib/config/jwt.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [database, jwt],
      cache: true,
      isGlobal: true,
      expandVariables: true,
      validationSchema: ValidateSchema,
      validate: validateEnv,
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class NestConfigModule {}
