import { Module } from '@nestjs/common';

import { PrismaModule } from '@prisma/prisma.module';
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule],
})
export class UserModule {}
