import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateScheduleDto, UpdateScheduleDto } from '@modules/schedule/dto';
import { ScheduleService } from '@modules/schedule/services/schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  paginate() {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.scheduleService.findOne(+id);
  }

  @Post()
  create(@Body() data: CreateScheduleDto) {
    return this.scheduleService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateScheduleDto) {
    return this.scheduleService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }
}
