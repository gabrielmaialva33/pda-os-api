import { BaseEntity } from '@common/entities/base.entity';
import { Pojo } from 'objection';
import { DateTime } from 'luxon';
import { omit } from 'helper-fns';

import { Phone } from '@modules/phone/entities/phone.entity';
import { Address } from '@modules/address/entities/address.entity';
import { Shop } from '@modules/shop/entities/shop.entity';

export class Client extends BaseEntity {
  static tableName = 'clients';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  full_name: string;
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
      modelClass: Phone,
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
      modelClass: Address,
      join: {
        from: 'clients.id',
        through: {
          from: 'address_clients.client_id',
          to: 'address_clients.address_id',
        },
        to: 'addresses.id',
      },
    },
    shop: {
      relation: BaseEntity.HasOneRelation,
      modelClass: Shop,
      join: {
        from: 'clients.id',
        to: 'shops.client_id',
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
      required: ['full_name', 'cpf', 'rg', 'birth_date'],

      properties: {
        id: { type: 'string' },
        full_name: { type: 'string', minLength: 3, maxLength: 255 },
        cpf: { type: 'string' },
        rg: { type: 'string' },
        birth_date: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    };
  }

  static get jsonAttributes() {
    return ['full_name', 'cpf', 'rg'];
  }

  /**
   * ------------------------------------------------------
   * Serializer
   * ------------------------------------------------------
   */
  $formatJson(json: Pojo) {
    json = super.$formatJson(json);
    return omit(json, ['is_deleted', 'created_at', 'updated_at', 'deleted_at']);
  }
}
