import {
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToMany,
  Property,
} from '@mikro-orm/core';

import { RoleRepository } from '@role/repositories/role.repository';
import { UserEntity } from '@user/entities/user.entity';
import { BaseEntity } from '@common/entities/base.entity';

@Entity({
  tableName: 'roles',
  comment: 'Role Table',
  customRepository: () => RoleRepository,
})
export class RoleEntity extends BaseEntity {
  [EntityRepositoryType]?: RoleRepository;

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   * - column typing struct
   */

  @Property({ length: 50, hidden: true, unique: true, comment: 'Role Name' })
  name: string;

  @Property({ length: 50 })
  slug: string;

  @Property({ length: 255 })
  description: string;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   * - define model relationships
   */
  @ManyToMany({
    entity: () => UserEntity,
    //pivotEntity: () => UserRoleEntity,
    pivotTable: 'users_roles',
    joinColumn: 'user_id',
    inverseJoinColumn: 'role_id',
    hidden: true,
  })
  users: Collection<UserEntity> = new Collection<UserEntity>(this);

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */

  /**
   * ------------------------------------------------------
   * Methods
   * ------------------------------------------------------
   */
  @Enum({
    items: () => ['slug', 'description'],
    persist: false,
    hidden: true,
  })
  search_fields: string[];

  /**
   * ------------------------------------------------------
   * Query Scopes
   * ------------------------------------------------------
   */
}
