import { Module } from '@nestjs/common';
import { OrmModule } from '@lib/orm/orm.module';

import { ScheduleRepository } from '@modules/schedule/repositories/schedule.repository';
import { ScheduleController } from '@modules/schedule/controllers/schedule.controller';
import { ScheduleService } from '@modules/schedule/services/schedule.service';

@Module({
  imports: [OrmModule],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleRepository],
})
export class ScheduleModule {}
