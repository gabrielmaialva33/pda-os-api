import { DateTime } from 'luxon';
import { pick } from 'helper-fns';
import { Pojo } from 'objection';

import { BaseEntity } from '@common/entities/base.entity';
import { PhoneType } from '@modules/phone/enum/phone-type.enum';
import { Collaborator } from '@modules/collaborator/entities/collaborator.entity';

export class Phone extends BaseEntity {
  static tableName = 'phones';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  phone: string;
  type: string = PhoneType.NOT_INFORMED;

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
        from: 'phones.id',
        through: {
          from: 'phone_collaborators.phone_id',
          to: 'phone_collaborators.collaborator_id',
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
      required: ['phone'],
      properties: {
        phone: { type: 'string' },
        type: { type: 'string' },
        is_deleted: { type: 'boolean' },
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
    json = pick(json, ['id', 'phone', 'type', 'collaborators']);
    return json;
  }
}
