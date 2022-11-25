import { BaseEntity } from '@common/entities/base.entity';
import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  Property,
} from '@mikro-orm/core';
import { RoleRepository } from '@role/repositories/role.repository';
import { UserEntity } from '@user/entities/user.entity';
import { UserRoleEntity } from '@user/entities/user.role.entity';

@Entity({
  tableName: 'roles',
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

  @Property({ length: 50, hidden: true })
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
  @ManyToMany(() => UserEntity, (user) => user.roles, {
    pivotEntity: () => UserRoleEntity,
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

  /**
   * ------------------------------------------------------
   * Query Scopes
   * ------------------------------------------------------
   */
}
