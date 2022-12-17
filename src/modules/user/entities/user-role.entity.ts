import Objection, { Model, Pojo } from 'objection';

import { User } from '@modules/user/entities/user.entity';
import { Role } from '@modules/role/entities/role.entity';

export class UserRole extends Model {
  static tableName = 'user_roles';

  id: string;
  user_id: string;
  role_id: string;
  created_at: string;
  updated_at: string;

  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'user_roles.user_id',
          to: 'users.id',
        },
      },
      role: {
        relation: Model.HasOneRelation,
        modelClass: Role,
        join: {
          from: 'user_roles.role_id',
          to: 'roles.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'role_id'],

      properties: {
        id: { type: 'integer' },
        user_id: { type: 'string' },
        role_id: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    };
  }

  $beforeUpdate(
    opt: Objection.ModelOptions,
    queryContext: Objection.QueryContext,
  ): Promise<any> | void {
    super.$beforeUpdate(opt, queryContext);
    this.updated_at = new Date().toISOString();
  }

  $formatJson(json: Pojo) {
    json = super.$formatJson(json);
    return json;
  }
}
