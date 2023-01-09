import { Pojo } from 'objection';
import { DateTime } from 'luxon';
import { omit } from 'helper-fns';

import { BaseEntity } from '@common/entities/base.entity';

export class Schedule extends BaseEntity {
  static tableName = 'schedules';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  date: string;
  start_time: string;
  end_time: string;
  note: string;
  status: string;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   */
  static relationMappings = {
    collaborators: {
      relation: BaseEntity.ManyToManyRelation,
      modelClass: `${__dirname}/../../collaborator/entities/collaborator.entity`,
      join: {
        from: 'schedules.id',
        through: {
          from: 'schedule_collaborators.schedule_id',
          to: 'schedule_collaborators.collaborator_id',
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
      required: ['date', 'start_time', 'end_time', 'status'],
      properties: {
        date: { type: 'string' },
        start_time: { type: 'string' },
        end_time: { type: 'string' },
        note: { type: 'string' },
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
    return json;
  }
}
