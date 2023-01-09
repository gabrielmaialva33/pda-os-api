import { from, map } from 'rxjs';

import { BaseRepository } from '@common/repositories/base.repository';

import { Order } from '@modules/order/entities/order.entity';
import { IOrderRepository } from '@modules/order/interfaces/order-repository.interface';
import { ListOptions } from '@common/interfaces/base-repository.interface';

export class OrderRepository
  extends BaseRepository<Order>
  implements IOrderRepository
{
  constructor() {
    super(Order);
  }

  paginate(options: ListOptions<Order>) {
    return from(
      this.orm.transaction(async (trx) => {
        const query = this.orm.query(trx).notDeleted();

        query.withGraphFetched('[shop, shop.client, schedules]');

        if (options.search) {
          const fields = this.orm.jsonAttributes;
          for (const field of fields)
            query.orWhere(field, 'ilike', `%${options.search}%`);
        }

        /**
         * if exists page and per_page we want to paginate
         */
        if (options.page || options.per_page) {
          if (options.page < 1) options.page = 1;
          if (options.per_page < 1) options.per_page = 10;

          query.page(options.page - 1 || 0, options.per_page || 10);
        } else query.page(0, 10);

        /**
         * if exists sort and order we want to sort
         */
        if (options.sort || options.order)
          query.orderBy(
            (options.sort as string) || 'created_at',
            options.order || 'desc',
          );
        else query.orderBy('created_at', options.order || 'desc');

        return query;
      }),
    ).pipe(
      map(
        (result) =>
          ({
            results: result['results'] as Order[],
            total: result['total'] as number,
          } as { results: Order[]; total: number }),
      ),
    );
  }
}
