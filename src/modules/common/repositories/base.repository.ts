import {
  EntityData,
  EntityRepository,
  FilterQuery,
  Loaded,
  ObjectQuery,
  wrap,
} from '@mikro-orm/core';
import {
  Pagination,
  PaginationOptions,
} from '@common/interfaces/pagination.interface';
import { BaseEntity } from '@common/entities/base.entity';
import { EntityDTO, RequiredEntityData } from '@mikro-orm/core/typings';
import { RepositoryInterface } from '@common/interfaces/repository.interface';

export class BaseRepository<Model extends BaseEntity>
  extends EntityRepository<Model>
  implements RepositoryInterface<Model>
{
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

  async get(id: string): Promise<Loaded<Model>> {
    return this.findOne(id as FilterQuery<Model>);
  }

  async store(data: RequiredEntityData<Model>): Promise<Model> {
    const model = this.create(data);
    await this.persistAndFlush(model);
    return model;
  }

  async save(
    id: string,
    data: EntityData<Loaded<Model>> | Partial<EntityDTO<Loaded<Model>>>,
  ): Promise<Loaded<Model>> {
    const model = await this.findOneOrFail(id as FilterQuery<Model>);
    wrap(model).assign(data);
    await this.flush();
    return model;
  }

  async getBy(keys: string[], values: string[]) {
    const filters: any = [];
    for (let i = 0; i < keys.length; i++) filters.push({ [keys[i]]: values });
    return this.findOne({
      $or: [...filters],
    } as unknown as ObjectQuery<Model>);
  }
}
