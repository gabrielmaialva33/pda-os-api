import {
  Expression,
  Model,
  OrderByDirection,
  Page,
  PrimitiveValue,
  QueryBuilder,
} from 'objection';
import { GenericFunction } from '@common/interfaces/custom-query-builder.interface';

export class CustomQueryBuilder<M extends Model, R = M[]> extends QueryBuilder<
  M,
  R
> {
  ArrayQueryBuilderType!: CustomQueryBuilder<M, M[]>;
  SingleQueryBuilderType!: CustomQueryBuilder<M, M>;
  NumberQueryBuilderType!: CustomQueryBuilder<M, number>;
  PageQueryBuilderType!: CustomQueryBuilder<M, Page<M>>;

  async onlyCount() {
    const result = (await this.count({ c: '*' })) as unknown as { c: number }[];
    return +result[0].c;
  }

  async countColumn(col: string) {
    const result = (await this.count({ c: col })) as unknown as { c: number }[];
    return +result[0].c;
  }

  async sumColumn(col: string) {
    const result = (await this.sum(col)) as unknown as { c: number }[];
    return +result[0].c;
  }

  async avgColumn(col: string) {
    const result = (await this.avg(col)) as unknown as { c: number }[];
    return +result[0].c;
  }

  async minColumn(col: string) {
    const result = (await this.min(col)) as unknown as { c: number }[];
    return +result[0].c;
  }

  async maxColumn(col: string) {
    const result = (await this.max(col)) as unknown as { c: number }[];
    return +result[0].c;
  }

  async exists() {
    const result = await this.onlyCount();
    return !!result;
  }

  async chunk(cb: GenericFunction, size: number): Promise<void> {
    let offset = 0;
    let hasMore = true;
    while (!!!offset || hasMore) {
      const query = structuredClone(this);
      const records = (await query
        .offset(offset)
        .limit(size)) as unknown as M[];
      hasMore = !(records.length > 0);
      if (!hasMore) return;
      await cb(records);
      offset += size;
    }
  }

  cOrderBy(expressions: string): this {
    const orders = (expressions || '').split('|');
    for (const order of orders) {
      const [column, direction] = order.split(':');
      if (!column) continue;
      this.orderBy(column, (direction || 'ASC') as OrderByDirection);
    }

    return this;
  }

  when(
    condition: any,
    truthyCb: (query: CustomQueryBuilder<M, R>, condition: any) => this,
    falsyCb?: (query: CustomQueryBuilder<M, R>, condition: any) => this,
  ): this {
    if (condition) return truthyCb(this, condition);
    else if (falsyCb) return falsyCb(this, condition);
    else return this;
  }

  safeWhereIn(col: string, expr: Expression<PrimitiveValue>): this {
    if (!Array.isArray(expr)) return this;
    if (Array.isArray(expr) && expr.length < 1) return this;

    return this.whereIn(col, expr);
  }

  safeWhereNotIn(col: string, expr: Expression<PrimitiveValue>): this {
    if (!Array.isArray(expr)) return this;
    if (Array.isArray(expr) && expr.length < 1) return this;

    return this.whereNotIn(col, expr);
  }

  notDeleted() {
    const hasColumn = this.modelClass().jsonSchema.properties.is_deleted;
    if (hasColumn) return this.whereNot('is_deleted', true);
    return this;
  }
}
