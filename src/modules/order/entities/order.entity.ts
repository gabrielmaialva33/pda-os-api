import { BaseEntity } from '@common/entities/base.entity';
import { DateTime } from 'luxon';
import { Pojo } from 'objection';

export class Order extends BaseEntity {
  static tableName = 'orders';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  client_id: string;
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
    client: {
      relation: BaseEntity.BelongsToOneRelation,
      modelClass: `${__dirname}/../../client/entities/client.entity`,
      join: {
        from: 'orders.client_id',
        to: 'clients.id',
      },
    },
    shop: {
      relation: BaseEntity.BelongsToOneRelation,
      modelClass: `${__dirname}/../../shop/entities/shop.entity`,
      join: {
        from: 'orders.shop_id',
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
   * Methods
   * ------------------------------------------------------
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'client_id',
        'shop_id',
        'report',
        'accessories',
        'note',
        'status',
      ],
      properties: {
        id: { type: 'string' },
        client_id: { type: 'string' },
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
    return json;
  }
}
