import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from '@user/entities/user.entity';
import { UserController } from '@user/http/user.controller';
import { UserService } from '@user/services/user.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
