import { MiddlewareConsumer, Module } from '@nestjs/common';

import { PrismaModule } from '@prisma/prisma.module';
import { UserModule } from '@user/user.module';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { AuthModule } from '@auth/auth.module';
import { RoleModule } from '@/modules/role/role.module';
import { LoggerMiddleware } from '@/middlewares/logger.middleware';

@Module({
  controllers: [AppController],
  imports: [PrismaModule, UserModule, AuthModule, RoleModule],
  providers: [AppService],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('(.*)');
  }
}
