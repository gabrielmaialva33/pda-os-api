import { BaseRepository } from '@common/repositories/base.repository';
import { Schedule } from '@modules/schedule/entities/schedule.entity';

export class ScheduleRepository extends BaseRepository<Schedule> {
  constructor() {
    super(Schedule);
  }
}
