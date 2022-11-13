import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { EditUserDto, StoreUserDto } from '@user/dto';
import { UserService } from '@user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  list(
    @Query('page') page: number,
    @Query('per_page') perPage: number,
    @Query('search') search: string,
    @Query('sort') sort: string,
    @Query('direction') direction: 'asc' | 'desc',
  ) {
    return this.usersService.list({ page, perPage, search, sort, direction });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.usersService.get(id);
  }

  @Post()
  store(@Body() data: StoreUserDto) {
    return this.usersService.store(data);
  }

  @Patch(':id')
  edit(@Param('id') id: string, @Body() data: EditUserDto) {
    return this.usersService.save(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
