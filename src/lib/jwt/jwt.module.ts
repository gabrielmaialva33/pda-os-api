import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  exports: [JwtModule],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwt.secret'),
        signOptions: {
          expiresIn: config.get('jwt.access_expiry'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class NestJwtModule {}
