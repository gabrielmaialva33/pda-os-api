import { Model, ModelOptions, QueryContext } from 'objection';

import { CustomQueryBuilder } from '@common/entities/custom-query-builder';
import {
  LoadRelOptions,
  LoadRelSchema,
} from '@common/interfaces/custom-query-builder.interface';
import { ObjectUtils } from '@common/helpers';

export class BaseEntity extends Model {
  static idColumn = 'id';

  /**
   * ------------------------------------------------------
   * Misc
   * ------------------------------------------------------
   */

  QueryBuilderType!: CustomQueryBuilder<this>;

  static QueryBuilder = CustomQueryBuilder;
  static useLimitInFirst = true;

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  readonly id!: string;
  is_deleted: boolean;
  readonly created_at: string;
  updated_at: string;
  deleted_at?: string;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   */

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */
  async $beforeInsert(query: QueryContext) {
    super.$beforeInsert(query);
  }

  async $beforeUpdate(opt: ModelOptions, query: QueryContext) {
    super.$beforeUpdate(opt, query);
  }

  /**
   * ------------------------------------------------------
   * Methods
   * ------------------------------------------------------
   */
  async $forceLoad(
    expression: LoadRelSchema,
    options: LoadRelOptions,
  ): Promise<void> {
    await this.$fetchGraph(expression, options);
  }

  async $load(
    expression: LoadRelSchema,
    options: LoadRelOptions,
  ): Promise<void> {
    type ObjectKey = keyof typeof this;

    const getKeys = (obj: Record<string, any>): Array<Record<string, any>> => {
      const p = [];
      for (const key in obj) {
        const o = { parent: key, children: [] as Record<string, any>[] };
        if (key === '$recursive' || key === '$relation' || key === '$modify')
          continue;

        const exp = obj[key];
        if (typeof exp === 'object') o.children = getKeys(exp);
        p.push(o);
      }

      return p;
    };

    const p = getKeys(expression);

    const toBeLoadedRelations = {} as Record<string, any>;
    const getUnloadedRelationsList = async (
      model: this,
      rel: Array<any>,
      parent: string,
    ) => {
      for (const o of rel) {
        if (!model || !model[o.parent as unknown as ObjectKey])
          toBeLoadedRelations[
            parent !== '' ? `${parent}.${o.parent}` : o.parent
          ] = true;

        if (o.children.length > 0)
          await getUnloadedRelationsList(
            model[o.parent as ObjectKey] as unknown as this,
            o.children,
            o.parent,
          );
      }
    };

    await getUnloadedRelationsList(this, p, '');
    const promises = [];
    const alreadyLoading = [] as string[];
    for (const key in toBeLoadedRelations) {
      const [parent] = key.split('.');

      if (!alreadyLoading.includes(parent)) {
        promises.push(
          this.$fetchGraph(ObjectUtils.pick(expression, parent), options),
        );
        alreadyLoading.push(parent);
      }
    }

    await Promise.all(promises);

    return;
  }
}
