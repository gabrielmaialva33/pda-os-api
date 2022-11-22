import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { StoreRoleDto } from './dto/store-role.dto';
import { EditRoleDto } from './dto/edit-role.dto';
import { JwtAuthGuard } from '@auth/guards/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get()
  list(
    @Query('page') page: number,
    @Query('per_page') perPage: number,
    @Query('search') search: string,
    @Query('sort') sort: string,
    @Query('direction') direction: 'asc' | 'desc',
  ) {
    return this.roleService.list({
      page,
      perPage,
      search,
      sort,
      direction,
    });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.roleService.get(id);
  }

  @Post()
  store(@Body() data: StoreRoleDto) {
    return this.roleService.store(data);
  }

  @Patch(':id')
  edit(@Param('id') id: string, @Body() data: EditRoleDto) {
    return this.roleService.save(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
