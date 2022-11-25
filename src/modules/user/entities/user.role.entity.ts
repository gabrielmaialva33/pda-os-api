import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

import { UserEntity } from '@user/entities/user.entity';
import { RoleEntity } from '@role/entities/role.entity';
import { DateTime } from 'luxon';

@Entity({
  tableName: 'users_roles',
})
export class UserRoleEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id: string;

  @ManyToOne(() => UserEntity, {
    fieldName: 'user_entity_id',
    referenceColumnName: 'id',
  })
  user: UserEntity;

  @ManyToOne(() => RoleEntity, {
    fieldName: 'role_entity_id',
    referenceColumnName: 'id',
  })
  role: RoleEntity;

  @Property({
    name: 'assigned_at',
    type: 'datetime',
    defaultRaw: 'now()',
    onCreate: () => DateTime.local().toISO(),
  })
  assigned_at: DateTime;
}
