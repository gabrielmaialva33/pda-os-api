import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from '@user/entities/user.entity';
import { UserController } from '@user/http/user.controller';
import { UserService } from '@user/services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [MikroOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
