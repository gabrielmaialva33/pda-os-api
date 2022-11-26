import { Module } from '@nestjs/common';

import MikroOrmConfig from '@src/mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from '@app/app.controller';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { AppService } from '@app/app.service';
import { HealthModule } from '@health/health.module';
import { CommonModule } from '@common/common.module';

@Module({
  controllers: [AppController],
  imports: [
    UserModule,
    AuthModule,
    HealthModule,
    CommonModule,
    MikroOrmModule.forRoot(MikroOrmConfig),
  ],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
