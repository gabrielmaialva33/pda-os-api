import { BaseRepository } from '@common/repositories/base.repository';
import { Shop } from '@modules/shop/entities/shop.entity';
import { ListOptions } from '@common/interfaces/base-repository.interface';
import { from, map } from 'rxjs';
import { Client } from '@modules/client/entities/client.entity';

export class ShopRepository extends BaseRepository<Shop> {
  constructor() {
    super(Shop);
  }

  paginate(options?: ListOptions<Shop>) {
    return from(
      this.orm.transaction(async (trx) => {
        const query = this.orm.query(trx).notDeleted();

        query.withGraphFetched('client');

        if (options.search) {
          const fields = this.orm.jsonAttributes;
          for (const field of fields)
            query.orWhere(field, 'ilike', `%${options.search}%`);

          const clientFields = Client.jsonAttributes;
          for (const field of clientFields)
            query
              .joinRelated('client')
              .orWhere(field, 'ilike', `%${options.search}%`);
        }

        if (options.page || options.per_page) {
          if (options.page < 1) options.page = 1;
          if (options.per_page < 1) options.per_page = 10;

          query.page(options.page - 1 || 0, options.per_page || 10);
        } else query.page(0, 10);

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
            results: result['results'],
            total: result['total'],
          } as { results: Shop[]; total: number }),
      ),
    );
  }
}
