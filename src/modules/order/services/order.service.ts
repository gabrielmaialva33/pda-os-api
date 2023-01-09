import { Injectable, NotFoundException } from '@nestjs/common';
import { forkJoin, from, map, switchMap } from 'rxjs';
import { I18nService } from 'nestjs-i18n';
import { DateTime } from 'luxon';

import { ListOptions } from '@common/interfaces/base-repository.interface';
import { I18nTranslations } from '@/resources/i18n/generated/i18n.generated';

import { CreateOrderDto, UpdateOrderDto } from '@modules/order/dto';
import { OrderRepository } from '@modules/order/repositories/order.repository';
import { Order } from '@modules/order/entities/order.entity';
import { PaginationObject } from '@lib/pagination';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

  paginate({ page, per_page, search, order, sort }: ListOptions<Order>) {
    return from(
      this.orderRepository.paginate({
        page,
        per_page,
        search,
        order,
        sort,
      }),
    ).pipe(
      map(({ total, results: data }) =>
        PaginationObject<Order>({
          data,
          total,
          page,
          per_page,
          route: '/orders',
        }),
      ),
    );
  }

  get(id: string) {
    return from(
      this.orderRepository.getBy(['id'], id, {
        populate: '[shop, shop.client, schedules]',
      }),
    ).pipe(
      map((order) => {
        if (!order)
          throw new NotFoundException(
            this.i18nService.t('exception.not_found', {
              args: {
                entity: this.i18nService.t('model.order.entity'),
              },
            }),
          );

        return order;
      }),
    );
  }

  create({ schedule_ids, ...data }: CreateOrderDto) {
    return from(this.orderRepository.create(data)).pipe(
      switchMap((order) => {
        if (schedule_ids && schedule_ids.length)
          return this.syncSchedules(order, schedule_ids).pipe(
            switchMap(() =>
              order.$fetchGraph('[shop, shop.client, schedules]'),
            ),
          );

        return this.get(order.id);
      }),
    );
  }

  update(id: string, data: UpdateOrderDto) {
    return this.get(id).pipe(
      switchMap((order) => order.$query().patchAndFetch(data)),
    );
  }

  remove(id: string) {
    return this.get(id).pipe(
      switchMap((order) =>
        order.$query().patchAndFetch({
          is_deleted: true,
          deleted_at: DateTime.local().toISO(),
        }),
      ),
    );
  }

  syncSchedules(order: Order, scheduleIds: string[]) {
    return from(order.$relatedQuery('schedules').unrelate()).pipe(
      switchMap(() =>
        from(order.$relatedQuery('schedules').relate(scheduleIds)).pipe(
          map(() => order),
        ),
      ),
    );
  }
}
