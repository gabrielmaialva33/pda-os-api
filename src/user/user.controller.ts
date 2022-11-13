import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { EditUserDto, StoreUserDto } from '@user/dto';
import { UserService } from '@user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  findAll() {
    return this.usersService.list();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.get(id);
  }

  @Post()
  create(@Body() data: StoreUserDto) {
    return this.usersService.store(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: EditUserDto) {
    return this.usersService.save(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
