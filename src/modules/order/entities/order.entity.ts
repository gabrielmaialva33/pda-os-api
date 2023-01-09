import { DateTime } from 'luxon';
import { Pojo } from 'objection';
import { omit } from 'helper-fns';

import { BaseEntity } from '@common/entities/base.entity';
import { Shop } from '@modules/shop/entities/shop.entity';
import { Schedule } from '@modules/schedule/entities/schedule.entity';

export class Order extends BaseEntity {
  static tableName = 'orders';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  shop_id: string;
  report: string;
  accessories: string;
  note: string;
  status: string;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   */
  static relationMappings = {
    shop: {
      relation: BaseEntity.BelongsToOneRelation,
      modelClass: Shop,
      join: {
        from: 'orders.shop_id',
        to: 'shops.id',
      },
    },
    schedules: {
      relation: BaseEntity.ManyToManyRelation,
      modelClass: Schedule,
      join: {
        from: 'orders.id',
        through: {
          from: 'order_schedules.order_id',
          to: 'order_schedules.schedule_id',
        },
        to: 'schedules.id',
      },
    },
  };

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */
  async $beforeUpdate() {
    this.updated_at = DateTime.local().toISO();
  }

  /**
   * ------------------------------------------------------
   * Methods
   * ------------------------------------------------------
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['shop_id', 'report', 'accessories', 'note', 'status'],
      properties: {
        id: { type: 'string' },
        shop_id: { type: 'string' },
        report: { type: 'string' },
        accessories: { type: 'string' },
        note: { type: 'string' },
        status: { type: 'string' },
        is_deleted: { type: 'boolean' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        deleted_at: { type: ['string', 'null'] },
      },
    };
  }

  /**
   * ------------------------------------------------------
   * Serializer
   * ------------------------------------------------------
   */
  $formatJson(json: Pojo) {
    json = super.$formatJson(json);
    return omit(json, ['shop_id', 'is_deleted', 'deleted_at']);
  }
}
