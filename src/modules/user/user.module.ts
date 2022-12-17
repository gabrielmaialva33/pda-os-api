import { Module } from '@nestjs/common';
import { OrmModule } from '@lib/orm/orm.module';

import { UserRepository } from '@modules/user/repositories/user.repository';
import { UserController } from '@modules/user/controllers/user.controller';
import { UserService } from '@modules/user/services/user.service';

@Module({
  imports: [OrmModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
