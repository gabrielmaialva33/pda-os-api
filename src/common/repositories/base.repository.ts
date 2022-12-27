import { from, map, Observable } from 'rxjs';

import {
  IBaseRepository,
  ListOptions,
  ModelAttributes,
  QueryContext,
} from '@common/interfaces/base-repository.interface';
import { BaseEntity } from '@common/entities/base.entity';
import { ModelProps } from 'objection';

export class BaseRepository<Entity extends BaseEntity>
  implements IBaseRepository<Entity>
{
  constructor(protected orm: typeof BaseEntity) {}

  paginate(options?: ListOptions<Entity>) {
    return from(
      this.orm.transaction(async (trx) => {
        const query = this.orm.query(trx);

        if (options) {
          /**
           * if exists cotext is for the case when we want to paginate
           */
          if (options.context)
            if (options.context.populate && options.context.populate.length > 0)
              for (const relation of options.context.populate)
                query.withGraphFetched(relation);

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
        }

        return query;
      }),
    ).pipe(
      map(
        (result) =>
          ({
            results: result['results'] as Entity[],
            total: result['total'] as number,
          } as { results: Entity[]; total: number }),
      ),
    );
  }

  list(options?: ListOptions<Entity>): Observable<Entity[]> {
    return from(
      this.orm.transaction(async (trx) => {
        const query = this.orm.query(trx);

        if (options?.sort)
          query.orderBy(options.sort as string, options.order || 'desc');

        return query.orderBy('created_at', options.order || 'desc');
      }),
    ).pipe(map((result) => result as Entity[]));
  }

  create(data: ModelAttributes<Entity>): Observable<Entity> {
    return from(
      this.orm.transaction(async (trx) =>
        this.orm.query(trx).insert(data).returning('*'),
      ),
    ).pipe(map((result) => result as Entity));
  }

  createMany(data: ModelAttributes<Entity>[]): Observable<Entity[]> {
    return from(
      this.orm.transaction(async (trx) =>
        this.orm.query(trx).insert(data).returning('*'),
      ),
    ).pipe(map((result) => result as Entity[]));
  }

  getBy(
    keys: ModelProps<Entity>[],
    value: any,
    context?: QueryContext<Entity>,
  ): Observable<Entity> {
    return from(
      this.orm.transaction(async (trx) => {
        for (let i = 0; i < keys.length; i++) {
          const query = this.orm.query(trx).where(keys[i] as string, value);

          if (context) {
            if (context.populate && context.populate.length > 0)
              for (const relation of context.populate)
                query.withGraphFetched(relation);

            if (context.where) query.where(context.where);
          }

          const result = await query.first();

          if (result) return result;
        }
      }),
    ).pipe(map((result) => result as Entity));
  }

  update(model: Entity, data: ModelAttributes<Entity>): Observable<Entity> {
    return from(
      this.orm.transaction(async (trx) => {
        await model.$query(trx).patchAndFetch(data);
        return model;
      }),
    ).pipe(map((result) => result as Entity));
  }
}
