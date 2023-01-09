import { Model, Pojo } from 'objection';
import { DateTime } from 'luxon';

import { Schedule } from '@modules/schedule/entities/schedule.entity';
import { Order } from '@modules/order/entities/order.entity';

export class OrderSchedules extends Model {
  static tableName = 'order_schedules';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  id: string;
  order_id: string;
  schedule_id: string;
  created_at: string;
  updated_at: string;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   */
  static get relationMappings() {
    return {
      order: {
        relation: Model.HasOneRelation,
        modelClass: Order,
        join: {
          from: 'order_schedules.order_id',
          to: 'orders.id',
        },
      },
      schedule: {
        relation: Model.HasOneRelation,
        modelClass: Schedule,
        join: {
          from: 'order_schedules.schedule_id',
          to: 'schedules.id',
        },
      },
    };
  }

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
      required: ['order_id', 'schedule_id'],

      properties: {
        id: { type: 'string' },
        order_id: { type: 'string' },
        schedule_id: { type: 'string' },
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
    return json;
  }
}
