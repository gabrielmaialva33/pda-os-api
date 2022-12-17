import Objection, { Model, Pojo } from 'objection';

import { Address } from '@modules/address/entities/address.entity';
import { Client } from '@modules/client/entities/client.entity';

export class AddressClient extends Model {
  static tableName = 'address_clients';

  id: string;
  address_id: string;
  client_id: string;
  created_at: string;
  updated_at: string;

  static get relationMappings() {
    return {
      address: {
        relation: Model.HasOneRelation,
        modelClass: Address,
        join: {
          from: 'address_clients.address_id',
          to: 'addresses.id',
        },
      },
      client: {
        relation: Model.HasOneRelation,
        modelClass: Client,
        join: {
          from: 'address_clients.client_id',
          to: 'clients.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['address_id', 'client_id'],

      properties: {
        id: { type: 'integer' },
        address_id: { type: 'string' },
        client_id: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    };
  }

  $beforeUpdate(
    opt: Objection.ModelOptions,
    queryContext: Objection.QueryContext,
  ): Promise<any> | void {
    super.$beforeUpdate(opt, queryContext);
    this.updated_at = new Date().toISOString();
  }

  $formatJson(json: Pojo) {
    json = super.$formatJson(json);
    return json;
  }
}
