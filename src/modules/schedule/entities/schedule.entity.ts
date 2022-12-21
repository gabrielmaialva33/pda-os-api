import { Pojo } from 'objection';
import { DateTime } from 'luxon';

import { BaseEntity } from '@common/entities/base.entity';

export class Schedule extends BaseEntity {
  static tableName = 'schedules';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  date: DateTime;
  start_time: DateTime;
  end_time: DateTime;
  note: string;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   */

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */

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
  async $beforeUpdate() {
    this.updated_at = DateTime.local().toISO();
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
