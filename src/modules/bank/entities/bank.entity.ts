import { DateTime } from 'luxon';
import { Pojo } from 'objection';

import { BaseEntity } from '@common/entities/base.entity';

export class Bank extends BaseEntity {
  static tableName = 'banks';
  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  name: string;
  agency: string;
  account: string;
  pix: string;
  collaborator_id: string;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   */
  static relationMappings = {
    collaborator: {
      relation: BaseEntity.BelongsToOneRelation,
      modelClass: `${__dirname}/../../collaborator/entities/collaborator.entity`,
      join: {
        from: 'banks.collaborator_id',
        to: 'collaborators.id',
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
      required: ['name', 'agency', 'account', 'pix', 'collaborator_id'],
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        agency: { type: 'string' },
        account: { type: 'string' },
        pix: { type: 'string' },
        collaborator_id: { type: 'string' },
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
