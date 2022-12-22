import { Model, Pojo } from 'objection';
import { DateTime } from 'luxon';

import { Schedule } from '@modules/schedule/entities/schedule.entity';
import { Collaborator } from '@modules/collaborator/entities/collaborator.entity';

export class ScheduleCollaborator extends Model {
  static tableName = 'schedule_collaborators';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  id: string;
  schedule_id: string;
  collaborator_id: string;
  role: string;
  created_at: string;
  updated_at: string;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   */
  static get relationMappings() {
    return {
      schedule: {
        relation: Model.HasOneRelation,
        modelClass: Schedule,
        join: {
          from: 'schedule_collaborators.schedule_id',
          to: 'schedules.id',
        },
      },
      collaborator: {
        relation: Model.HasOneRelation,
        modelClass: Collaborator,
        join: {
          from: 'schedule_collaborators.collaborator_id',
          to: 'collaborators.id',
        },
      },
    };
  }

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
      required: ['schedule_id', 'collaborator_id', 'role'],

      properties: {
        id: { type: 'string' },
        schedule_id: { type: 'string' },
        collaborator_id: { type: 'string' },
        role: { type: 'string' },
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
