import { Pojo } from 'objection';
import { DateTime } from 'luxon';

import { BaseEntity } from '@common/entities/base.entity';

export class Schedule extends BaseEntity {
  static tableName = 'schedules';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  date: string;
  start_time: string;
  end_time: string;
  note: string;
  status: string;
  shop_id: string;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   */
  static relationMappings = {
    collaborators: {
      relation: BaseEntity.ManyToManyRelation,
      modelClass: `${__dirname}/../../collaborator/entities/collaborator.entity`,
      join: {
        from: 'schedules.id',
        through: {
          from: 'schedule_collaborators.schedule_id',
          to: 'schedule_collaborators.collaborator_id',
        },
        to: 'collaborators.id',
      },
    },
    shop: {
      relation: BaseEntity.BelongsToOneRelation,
      modelClass: `${__dirname}/../../shop/entities/shop.entity`,
      join: {
        from: 'schedules.shop_id',
        to: 'shops.id',
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
   * Scopes
   * ------------------------------------------------------
   */

  /**
   * ------------------------------------------------------
   * Methods
   * ------------------------------------------------------
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['date', 'start_time', 'end_time', 'status', 'shop_id'],
      properties: {
        date: { type: 'string' },
        start_time: { type: 'string' },
        end_time: { type: 'string' },
        note: { type: 'string' },
        shop_id: { type: 'string' },
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
