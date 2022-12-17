import { Module } from '@nestjs/common';
import { OrmModule } from '@lib/orm/orm.module';

import { RoleController } from '@modules/role/controllers/role.controller';
import { RoleService } from '@modules/role/services/role.service';
import { RoleRepository } from '@modules/role/repositories/role.repository';

@Module({
  imports: [OrmModule],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
