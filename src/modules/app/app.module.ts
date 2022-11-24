import { Module } from '@nestjs/common';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import MikroOrmConfig from '@src/mikro-orm.config';
import { UserModule } from '@user/user.module';

@Module({
  controllers: [AppController],
  imports: [MikroOrmModule.forRoot(MikroOrmConfig), UserModule],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
