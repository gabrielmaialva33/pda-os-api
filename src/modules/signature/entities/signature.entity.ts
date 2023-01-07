import { Pojo } from 'objection';
import { omit } from 'helper-fns';

import { BaseEntity } from '@common/entities/base.entity';
import { DateTime } from 'luxon';

export class Signature extends BaseEntity {
  static tableName = 'signatures';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  full_name: string;
  rubric: string;
  image_url: string;

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
      required: ['full_name', 'rubric', 'image_url'],

      properties: {
        id: { type: 'string' },
        full_name: { type: 'string', minLength: 1, maxLength: 160 },
        rubric: { type: 'string', minLength: 1, maxLength: 20 },
        image_url: { type: 'string', minLength: 1, maxLength: 255 },
        is_deleted: { type: 'boolean' },
      },
    };
  }

  static get jsonAttributes() {
    return ['full_name', 'rubric'];
  }

  /**
   * ------------------------------------------------------
   * Serializer
   * ------------------------------------------------------
   */
  $formatJson(json: Pojo) {
    json = super.$formatJson(json);
    return omit(json, ['is_deleted', 'created_at', 'updated_at', 'deleted_at']);
  }
}
