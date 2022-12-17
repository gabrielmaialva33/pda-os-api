import { BaseEntity } from '@common/entities/base.entity';
import { Pojo } from 'objection';
import { DateTime } from 'luxon';

export class Client extends BaseEntity {
  static tableName = 'clients';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  cpf: string;
  rg: string;
  birth_date: string;
  user_id: string;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   */
  static relationMappings = {
    phones: {
      relation: BaseEntity.ManyToManyRelation,
      modelClass: `${__dirname}/../../phone/entities/phone.entity`,
      join: {
        from: 'clients.id',
        through: {
          from: 'phone_clients.client_id',
          to: 'phone_clients.phone_id',
        },
        to: 'phones.id',
      },
    },
    addresses: {
      relation: BaseEntity.ManyToManyRelation,
      modelClass: `${__dirname}/../../address/entities/address.entity`,
      join: {
        from: 'clients.id',
        through: {
          from: 'address_clients.client_id',
          to: 'address_clients.address_id',
        },
        to: 'addresses.id',
      },
    },
    user: {
      relation: BaseEntity.HasOneRelation,
      modelClass: `${__dirname}/../../user/entities/user.entity`,
      join: {
        from: 'clients.user_id',
        to: 'users.id',
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
      required: ['cpf', 'rg', 'birth_date'],

      properties: {
        id: { type: 'string' },
        cpf: { type: 'string' },
        rg: { type: 'string' },
        birth_date: { type: 'string' },
        user_id: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
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
