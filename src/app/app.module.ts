import { Module } from '@nestjs/common';

import { PrismaModule } from '@prisma/prisma.module';
import { UserModule } from '@user/user.module';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { AuthModule } from '@auth/auth.module';

@Module({
  controllers: [AppController],
  imports: [PrismaModule, UserModule, AuthModule],
  providers: [AppService],
})
export class AppModule {}
