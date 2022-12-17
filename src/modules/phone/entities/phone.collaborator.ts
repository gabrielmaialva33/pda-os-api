import Objection, { Model, Pojo } from 'objection';
import { Phone } from '@modules/phone/entities/phone.entity';
import { Collaborator } from '@modules/collaborator/entities/collaborator.entity';

export class PhoneCollaborator extends Model {
  static tableName = 'phone_collaborators';

  id: string;
  phone_id: string;
  collaborator_id: string;
  created_at: string;
  updated_at: string;

  static get relationMappings() {
    return {
      phone: {
        relation: Model.HasOneRelation,
        modelClass: Phone,
        join: {
          from: 'phone_collaborators.phone_id',
          to: 'phones.id',
        },
      },
      collaborator: {
        relation: Model.HasOneRelation,
        modelClass: Collaborator,
        join: {
          from: 'phone_collaborators.collaborator_id',
          to: 'collaborators.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['phone_id', 'collaborator_id'],

      properties: {
        id: { type: 'integer' },
        phone_id: { type: 'string' },
        collaborator_id: { type: 'string' },
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
