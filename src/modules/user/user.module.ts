import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from '@user/entities/user.entity';
import { UserController } from '@user/http/user.controller';
import { UserService } from '@user/services/user.service';
import { UserRoleEntity } from '@user/entities/user.role.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [MikroOrmModule.forFeature([UserEntity, UserRoleEntity])],
})
export class UserModule {}
