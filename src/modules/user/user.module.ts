import { Module } from '@nestjs/common';

import { PrismaModule } from '@prisma/prisma.module';
import { UserController } from '@/modules/user/user.controller';
import { UserService } from '@/modules/user/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [PrismaModule],
})
export class UserModule {}
