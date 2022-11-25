import { Module } from '@nestjs/common';
import { RoleController } from '@role/http/role.controller';
import { RoleService } from '@role/services/role.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RoleEntity } from '@role/entities/role.entity';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
  imports: [MikroOrmModule.forFeature([RoleEntity])],
})
export class RoleModule {}
