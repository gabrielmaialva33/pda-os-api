import { Pojo } from 'objection';
import { pick } from 'helper-fns';

import { BaseEntity } from '@common/entities/base.entity';
import { Collaborator } from '@modules/collaborator/entities/collaborator.entity';

export class Address extends BaseEntity {
  static tableName = 'addresses';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   */
  static relationMappings = {
    collaborators: {
      relation: BaseEntity.ManyToManyRelation,
      modelClass: Collaborator,
      join: {
        from: 'addresses.id',
        through: {
          from: 'address_collaborators.address_id',
          to: 'address_collaborators.collaborator_id',
        },
        to: 'collaborators.id',
      },
    },
  };

  /**
   * ------------------------------------------------------
   * Hooks
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
        'street',
        'number',
        'neighborhood',
        'city',
        'state',
        'zip_code',
      ],
      properties: {
        id: { type: 'string' },
        street: { type: 'string', minLength: 1, maxLength: 100 },
        number: { type: 'string', minLength: 1, maxLength: 10 },
        complement: { type: 'string', minLength: 1, maxLength: 100 },
        neighborhood: { type: 'string', minLength: 1, maxLength: 100 },
        city: { type: 'string', minLength: 1, maxLength: 100 },
        state: { type: 'string', minLength: 2, maxLength: 2 },
        zip_code: { type: 'string', minLength: 1, maxLength: 10 },
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
    json = pick(json, [
      'id',
      'street',
      'number',
      'complement',
      'neighborhood',
      'city',
      'state',
      'zip_code',
      'collaborators',
    ]);
    return json;
  }
}
