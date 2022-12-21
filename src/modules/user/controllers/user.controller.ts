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
import { ModelProps } from 'objection';

import { UseZodGuard } from '@lib/zod';
import { JwtAuthGuard } from '@common/guards/jwt.auth.guard';

import { UserService } from '@modules/user/services/user.service';
import { User } from '@modules/user/entities/user.entity';
import {
  CreateUserDto,
  ListUserSchema,
  UpdateUserDto,
} from '@modules/user/dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseZodGuard('query', ListUserSchema)
  paginate(
    @Query('page') page: number,
    @Query('per_page') per_page: number,
    @Query('search') search: string,
    @Query('sort') sort: ModelProps<User>,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.userService.paginate({
      page,
      per_page,
      search,
      sort,
      order,
    });
  }

  @Get('all')
  @UseZodGuard('query', ListUserSchema)
  list(
    @Query('sort') sort: ModelProps<User>,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.userService.list({
      sort,
      order,
    });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.userService.get(id);
  }

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
