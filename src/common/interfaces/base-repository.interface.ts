import { BaseEntity } from '@common/entities/base.entity';
import { Observable } from 'rxjs';
import { ModelProps, RelationExpression } from 'objection';

export interface IBaseRepository<Entity extends BaseEntity> {
  /**
   * @description Paginate and sort the list of entities
   * @param {ListOptions<Entity>} options
   * @returns {Observable<{ results: Entity[]; total: number }>}
   * @memberof IBaseRepository
   * @example
   * const { results, total } = await this.repository.paginate({ page: 1, per_page: 10, sort: 'created_at', order: 'desc' });
   */
  paginate(options?: ListOptions<Entity>): Observable<{
    results: Entity[];
    total: number;
  }>;

  /**
   * @description List all entities in the database
   * @param {ListOptions<Entity>} options
   * @returns {Observable<Entity[]>}
   * @memberof IBaseRepository
   * @example
   * // returns [{ id: 2, name: 'John Doe' }, { id: 1, name: 'Jane Doe' }]
   * const entities = await this.repository.list({ sort: 'created_at', order: 'desc' });
   */
  list({ sort, order }?: ListOptions<Entity>): Observable<Entity[]>;

  /**
   * @description Find by key value
   * @param {ModelProps<Entity>[]} keys
   * @param {any} value
   * @param {QueryContext<Entity>} context
   * @returns {Observable<Entity>}
   * @memberof IBaseRepository
   * @example
   * // returns { id: 1, name: 'John Doe' }
   * const user = await this.userRepository.getBy('id', 1);
   */
  getBy(
    keys: ModelProps<Entity>[],
    value: any,
    context?: QueryContext<Entity>,
  ): Observable<Entity>;

  /**
   * @description Store a new entity in the database
   * @param {ModelAttributes<Entity>} data
   * @param {InsertContext<Entity>} context
   * @returns {Observable<Entity>}
   * @memberof IBaseRepository
   * @example
   * // returns { id: 1, name: 'John Doe' }
   * const user = await this.userRepository.create({ name: 'John Doe' });
   */
  create(data: ModelAttributes<Entity>): Observable<Entity>;

  createMany(data: ModelAttributes<Entity>[]): Observable<Entity[]>;

  /**
   * @description Update an entity in the database
   * @param {string} id
   * @param {ModelAttributes<Entity>} data
   * @returns {Observable<Entity>}
   * @memberof IBaseRepository
   * @example
   * // returns { id: 1, name: 'John Doe' }
   * const user = await this.userRepository.update(1, { name: 'John Doe' });
   */
  update(id: string, data: ModelAttributes<Entity>): Observable<Entity>;
}

export type ModelAttributes<T extends BaseEntity> = { [k in keyof T]?: T[k] };

export interface ListOptions<T extends BaseEntity> {
  page?: number;
  per_page?: number;
  search?: string;
  sort?: ModelProps<T>;
  order?: 'asc' | 'desc';
  context?: QueryContext<T>;
}

export interface QueryContext<T extends BaseEntity> {
  where?: { [k in keyof T]?: T[k] };
  populate?: RelationExpression<T>[];
}
