import { DateTime } from 'luxon';
import { Pojo } from 'objection';
import { omit } from 'helper-fns';

import { BaseEntity } from '@common/entities/base.entity';

export class Shop extends BaseEntity {
  static tableName = 'shops';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  code: string;
  name: string;
  type: string;
  cost: number;
  profit: number;
  percentage_profit: number;
  net_profit: number;
  sale_price: number;
  commission: number;
  send_sms: boolean;
  forecast_return: number;
  status: string;
  client_id: string;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   */
  static relationMappings = {
    client: {
      relation: BaseEntity.BelongsToOneRelation,
      modelClass: `${__dirname}/../../client/entities/client.entity`,
      join: {
        from: 'shops.client_id',
        to: 'clients.id',
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
      required: [
        'code',
        'name',
        'type',
        'cost',
        'profit',
        'percentage_profit',
        'net_profit',
        'sale_price',
        'commission',
        'send_sms',
        'forecast_return',
        'status',
        'client_id',
      ],

      properties: {
        id: { type: 'string' },
        code: { type: 'string' },
        name: { type: 'string' },
        type: { type: 'string' },
        cost: { type: 'number' },
        profit: { type: 'number' },
        percentage_profit: { type: 'number' },
        net_profit: { type: 'number' },
        sale_price: { type: 'number' },
        commission: { type: 'number' },
        send_sms: { type: 'boolean' },
        forecast_return: { type: 'number' },
        status: { type: 'string' },
        client_id: { type: 'string' },
        is_deleted: { type: 'boolean' },
      },
    };
  }

  static get jsonAttributes() {
    return ['code', 'name'];
  }

  /**
   * ------------------------------------------------------
   * Serializer
   * ------------------------------------------------------
   */
  $formatJson(json: Pojo) {
    json = super.$formatJson(json);
    return omit(json, [
      'client_id',
      'is_deleted',
      'created_at',
      'updated_at',
      'deleted_at',
    ]);
  }
}
