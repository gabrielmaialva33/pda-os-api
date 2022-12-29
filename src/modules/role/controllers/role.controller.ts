import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ModelProps } from 'objection';

import { JwtAuthGuard } from '@common/guards/jwt.auth.guard';

import { RoleService } from '@modules/role/services/role.service';
import { Role } from '@modules/role/entities/role.entity';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  paginate(
    @Query('page') page: number,
    @Query('per_page') per_page: number,
    @Query('sort') sort: ModelProps<Role>,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.roleService.paginate({
      page,
      per_page,
      sort,
      order,
    });
  }

  @Get('/all')
  list(
    @Query('sort') sort: ModelProps<Role>,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.roleService.list({
      sort,
      order,
    });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.roleService.get(id);
  }
}
