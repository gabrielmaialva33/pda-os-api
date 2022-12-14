import { Injectable, NotFoundException } from '@nestjs/common';
import { from, map, switchMap } from 'rxjs';
import { I18nService } from 'nestjs-i18n';
import { DateTime } from 'luxon';
import { ListOptions } from '@common/interfaces/base-repository.interface';
import { PaginationObject } from '@lib/pagination';

import { CreateScheduleDto, UpdateScheduleDto } from '@modules/schedule/dto';
import { ScheduleRepository } from '@modules/schedule/repositories/schedule.repository';
import { Schedule } from '@modules/schedule/entities/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly i18nService: I18nService,
  ) {}

  paginate({ page, per_page, search, sort, order }: ListOptions<Schedule>) {
    return from(
      this.scheduleRepository.paginate({
        page,
        per_page,
        search,
        sort,
        order,
        context: { populate: '[collaborators]' },
      }),
    ).pipe(
      map(({ total, results: data }) =>
        PaginationObject<Schedule>({
          data,
          total,
          page,
          per_page,
          route: '/schedules',
        }),
      ),
    );
  }

  get(id: string) {
    return from(
      this.scheduleRepository.getBy(['id'], id, {
        populate: '[collaborators]',
      }),
    ).pipe(
      map((schedule) => {
        if (!schedule)
          throw new NotFoundException(
            this.i18nService.t('exception.not_found', {
              args: { entity: this.i18nService.t('model.schedule.entity') },
            }),
          );

        return schedule;
      }),
    );
  }

  create({ collaborators, ...data }: CreateScheduleDto) {
    return from(this.scheduleRepository.create(data)).pipe(
      switchMap((schedule) => {
        return from(
          schedule.$relatedQuery('collaborators').relate(collaborators),
        ).pipe(switchMap(() => this.get(schedule.id)));
      }),
    );
  }

  update(id: string, { collaborators, ...data }: UpdateScheduleDto) {
    return this.get(id)
      .pipe(switchMap((schedule) => schedule.$query().patchAndFetch(data)))
      .pipe(
        switchMap((schedule) => {
          if (collaborators)
            return this.syncCollaborators(schedule, collaborators).pipe(
              switchMap(() => this.get(schedule.id)),
            );

          return this.get(schedule.id);
        }),
      );
  }

  remove(id: string) {
    return this.get(id).pipe(
      map((schedule) =>
        schedule.$query().patchAndFetch({
          is_deleted: true,
          deleted_at: DateTime.local().toISO(),
        }),
      ),
    );
  }

  syncCollaborators(schedule: Schedule, collaborators: object[]) {
    return from(schedule.$relatedQuery('collaborators').unrelate()).pipe(
      switchMap(() =>
        from(schedule.$relatedQuery('collaborators').relate(collaborators)),
      ),
    );
  }
}
