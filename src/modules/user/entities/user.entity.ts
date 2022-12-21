import { ModelProps, Pojo } from 'objection';
import { DateTime } from 'luxon';
import { omit } from 'helper-fns';

import { Argon2Utils } from '@common/helpers';
import { BaseEntity } from '@common/entities/base.entity';

import { Role } from '@modules/role/entities/role.entity';

export class User extends BaseEntity {
  static tableName = 'users';
  static uids: ModelProps<User>[] = ['user_name', 'email'];

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  user_name: string;
  password: string;
  avatar: string;
  is_online: boolean;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   */
  static relationMappings = {
    roles: {
      relation: BaseEntity.ManyToManyRelation,
      modelClass: Role,
      join: {
        from: 'users.id',
        through: {
          from: 'user_roles.user_id',
          to: 'user_roles.role_id',
        },
        to: 'roles.id',
      },
    },
  };

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */
  async $beforeInsert() {
    this.password = await Argon2Utils.hash(this.password);
  }

  async $beforeUpdate() {
    if (this.password) this.password = await Argon2Utils.hash(this.password);
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
      required: ['first_name', 'last_name', 'email', 'user_name', 'password'],

      properties: {
        id: { type: 'string' },
        first_name: { type: 'string', minLength: 1, maxLength: 80 },
        last_name: { type: 'string', minLength: 1, maxLength: 80 },
        full_name: { type: 'string', minLength: 1, maxLength: 160 },
        email: { type: 'string', minLength: 1, maxLength: 160 },
        user_name: { type: 'string', minLength: 1, maxLength: 50 },
        password: { type: 'string', minLength: 1, maxLength: 118 },
        avatar: { type: 'string', minLength: 1, maxLength: 255 },
        is_online: { type: 'boolean' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    };
  }

  static get jsonAttributes() {
    return ['first_name', 'last_name', 'full_name', 'email', 'user_name'];
  }

  /**
   * ------------------------------------------------------
   * Serializer
   * ------------------------------------------------------
   */
  $formatJson(json: Pojo) {
    json = super.$formatJson(json);
    json.avatar = `https://api.multiavatar.com/${json.user_name.toLowerCase()}.svg`;

    if (json.roles) json.role = json.roles[0].slug.toLowerCase();

    return omit(json, [
      'password',
      'is_deleted',
      'roles',
      'deleted_at',
      'created_at',
      'updated_at',
    ]);
  }
}
