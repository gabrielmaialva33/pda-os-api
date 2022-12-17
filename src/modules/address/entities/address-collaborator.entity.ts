import Objection, { Model, Pojo } from 'objection';
import { Address } from '@modules/address/entities/address.entity';
import { Collaborator } from '@modules/collaborator/entities/collaborator.entity';

export class AddressCollaborator extends Model {
  static tableName = 'address_collaborators';

  id: string;
  address_id: string;
  collaborator_id: string;
  created_at: string;
  updated_at: string;

  static get relationMappings() {
    return {
      address: {
        relation: Model.HasOneRelation,
        modelClass: Address,
        join: {
          from: 'address_collaborators.address_id',
          to: 'addresses.id',
        },
      },
      collaborator: {
        relation: Model.HasOneRelation,
        modelClass: Collaborator,
        join: {
          from: 'address_collaborators.collaborator_id',
          to: 'collaborators.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['address_id', 'collaborator_id'],

      properties: {
        id: { type: 'integer' },
        address_id: { type: 'string' },
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
