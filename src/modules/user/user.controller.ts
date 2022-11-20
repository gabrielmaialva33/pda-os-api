import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { EditUserDto, StoreUserDto } from '@/modules/user/dto';
import { UserService } from '@/modules/user/user.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  get(@Param('id') id: string) {
    return this.usersService.get(id);
  }

  @Post()
  store(@Body() data: StoreUserDto) {
    return this.usersService.store(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  edit(@Param('id') id: string, @Body() data: EditUserDto) {
    return this.usersService.save(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
