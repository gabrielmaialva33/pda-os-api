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

import { JwtAuthGuard } from '@common/guards/jwt.auth.guard';

import { CreateScheduleDto, UpdateScheduleDto } from '@modules/schedule/dto';
import { ScheduleService } from '@modules/schedule/services/schedule.service';
import { Schedule } from '@modules/schedule/entities/schedule.entity';

@UseGuards(JwtAuthGuard)
@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  paginate(
    @Query('page') page: number,
    @Query('per_page') per_page: number,
    @Query('search') search: string,
    @Query('sort') sort: ModelProps<Schedule>,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.scheduleService.paginate({
      page,
      per_page,
      search,
      sort,
      order,
    });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.scheduleService.get(id);
  }

  @Post()
  create(@Body() data: CreateScheduleDto) {
    return this.scheduleService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateScheduleDto) {
    return this.scheduleService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(id);
  }
}
