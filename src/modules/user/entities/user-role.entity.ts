import {
  BaseEntity,
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { DateTime } from 'luxon';

import { UserEntity } from '@user/entities/user.entity';
import { RoleEntity } from '@role/entities/role.entity';

@Entity({
  tableName: 'users_roles',
  collection: 'users_roles',
  comment: 'UserRoleEntity Pivot Table',
})
export class UserRoleEntity extends BaseEntity<UserRoleEntity, 'id'> {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id: string;

  @ManyToOne({
    entity: () => UserEntity,
    primary: true,
    cascade: [Cascade.ALL],
    onDelete: 'cascade',
    referencedColumnNames: ['id'],
  })
  user: UserEntity;

  @ManyToOne({
    entity: () => RoleEntity,
    primary: true,
    cascade: [Cascade.ALL],
    onDelete: 'cascade',
    referencedColumnNames: ['id'],
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
