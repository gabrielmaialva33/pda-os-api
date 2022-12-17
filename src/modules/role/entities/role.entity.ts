import { pick } from 'helper-fns';
import { DateTime } from 'luxon';
import { Pojo } from 'objection';

import { BaseEntity } from '@common/entities/base.entity';

export class Role extends BaseEntity {
  static tableName = 'roles';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  slug: string;
  name: string;
  description: string;

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
   * Methods
   * ------------------------------------------------------
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'slug'],

      properties: {
        id: { type: 'string' },
        name: { type: 'string', minLength: 1, maxLength: 80 },
        slug: { type: 'string', minLength: 1, maxLength: 80 },
        description: { type: 'string', minLength: 1, maxLength: 160 },
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
    json = pick(json, ['id', 'slug', 'description']);
    return json;
  }
}
