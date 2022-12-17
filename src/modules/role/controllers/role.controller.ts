import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ModelProps } from 'objection';

import { RoleService } from '@modules/role/services/role.service';
import { CreateRoleDto, UpdateRoleDto } from '@modules/role/dto';
import { Role } from '@modules/role/entities/role.entity';

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

  @Post()
  create(@Body() data: CreateRoleDto) {
    return this.roleService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateRoleDto) {
    return this.roleService.update(id, data);
  }
}
