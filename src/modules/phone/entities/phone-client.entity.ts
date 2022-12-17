import Objection, { Model, Pojo } from 'objection';
import { DateTime } from 'luxon';

export class PhoneClient extends Model {
  static tableName = 'phone_clients';

  id: string;
  phone_id: string;
  client_id: string;
  created_at: string;
  updated_at: string;

  static get relationMappings() {
    return {
      phone: {
        relation: Model.HasOneRelation,
        modelClass: `${__dirname}/../../phone/entities/phone.entity`,
        join: {
          from: 'phone_clients.phone_id',
          to: 'phones.id',
        },
      },
      client: {
        relation: Model.HasOneRelation,
        modelClass: `${__dirname}/../../client/entities/client.entity`,
        join: {
          from: 'phone_clients.client_id',
          to: 'clients.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['phone_id', 'client_id'],

      properties: {
        id: { type: 'string' },
        phone_id: { type: 'string' },
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
    this.updated_at = DateTime.local().toISO();
  }

  $formatJson(json: Pojo) {
    json = super.$formatJson(json);
    return json;
  }
}
