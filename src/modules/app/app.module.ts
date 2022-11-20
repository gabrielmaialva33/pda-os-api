import { Module } from '@nestjs/common';

import { PrismaModule } from '@prisma/prisma.module';
import { UserModule } from '@/modules/user/user.module';
import { AppController } from '@/modules/app/app.controller';
import { AppService } from '@/modules/app/app.service';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  controllers: [AppController],
  imports: [PrismaModule, UserModule, AuthModule],
  providers: [AppService],
})
export class AppModule {}
