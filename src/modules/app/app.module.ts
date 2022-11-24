import { Module } from '@nestjs/common';

import MikroOrmConfig from '@src/mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from '@app/app.controller';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { AppService } from '@app/app.service';

@Module({
  controllers: [AppController],
  imports: [UserModule, AuthModule, MikroOrmModule.forRoot(MikroOrmConfig)],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
