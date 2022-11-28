import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { database } from '@src/lib/config/configs/database.config';
import { ValidationSchema } from '@src/lib/config/validate.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      load: [database],
      cache: true,
      isGlobal: true,
      expandVariables: true,
      validationSchema: ValidationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class NestConfigModule {}
