import { BaseEntity } from '@common/entities/base.entity';
import { User } from '@modules/user/entities/user.entity';
import { DateTime } from 'luxon';

export class Token extends BaseEntity {
  static tableName = 'tokens';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  user_id: string;
  token: string;
  type: string;
  is_revoked: boolean;
  expires_at: string;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   */
  static relationMappings = {
    user: {
      relation: BaseEntity.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'tokens.user_id',
        to: 'users.id',
      },
    },
  };

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */
  async $beforeInsert() {
    this.expires_at = DateTime.local().plus({ days: 1 }).toISO();
  }

  async $beforeUpdate() {
    this.updated_at = DateTime.local().toISO();
  }

  /**
   * ------------------------------------------------------
   * Methods
   * ------------------------------------------------------
   */

  /**
   * ------------------------------------------------------
   * Serializer
   * ------------------------------------------------------
   */
}
