import { AnyEntity, EntityRepository, ObjectQuery } from '@mikro-orm/core';
import {
  Pagination,
  PaginationOptions,
} from '@common/interfaces/pagination.interface';

export class BaseRepository<
  Model extends AnyEntity,
> extends EntityRepository<Model> {
  async paginate({
    page = 1,
    per_page = 10,
    search,
    sort = 'created_at',
    direction = 'asc',
  }: PaginationOptions): Promise<Pagination<Model>> {
    const filter: any = [];
    if (search) {
      const fields = this._em.getMetadata().get<Model>(String(this.entityName))
        .properties['search_fields'].items;
      fields.forEach((field) => {
        filter.push({ [field]: { $like: `%${search}%` } });
      });
    }

    const [data, total] = await this.findAndCount(
      {
        $or: [...filter],
      } as unknown as ObjectQuery<Model>,
      {
        limit: per_page,
        offset: Math.abs(per_page * (page - 1)),
        orderBy: {
          [sort]: direction,
        } as any,
      },
    );

    return {
      meta: {
        total,
        per_page: Number(per_page),
        current_page: Number(page),
        last_page: Math.ceil(total / Number(per_page)),
        first_page: 1,
        first_page_url: '/?page=1',
        last_page_url: `/?page=${Math.ceil(total / Number(per_page))}`,
        next_page_url: `/?page=${Number(page) + 1}`,
        previous_page_url:
          Number(page) > 1 ? `/?page=${Number(page) - 1}` : null,
      },
      data,
    };
  }

  async getBy() {}
}
