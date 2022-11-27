import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { HealthModule } from '@health/health.module';
import { CommonModule } from '@common/common.module';
import { LoggerModule } from '@logger/logger.module';

import MikroOrmConfig from '@src/mikro-orm.config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    HealthModule,
    CommonModule,
    LoggerModule,
    MikroOrmModule.forRoot(MikroOrmConfig),
  ],

  exports: [],
})
export class AppModule {}
