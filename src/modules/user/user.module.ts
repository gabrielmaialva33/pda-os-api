import { Module } from '@nestjs/common';

import { UserController } from '@user/http/user.controller';
import { UserService } from '@user/services/user.service';

import { OrmModule } from '@src/lib/orm/orm.module';
import { RoleModule } from '@role/role.module';

@Module({
  imports: [OrmModule, RoleModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
