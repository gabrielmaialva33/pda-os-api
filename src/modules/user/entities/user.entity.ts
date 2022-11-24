import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  EntityRepositoryType,
  Enum,
  Property,
} from '@mikro-orm/core';
import * as argon2 from 'argon2';

import { BaseEntity } from '@src/modules/common/entities/base.entity';
import { UserRepository } from '@user/repositories/user.repository';

@Entity({
  tableName: 'users',
  customRepository: () => UserRepository,
})
export class UserEntity extends BaseEntity {
  [EntityRepositoryType]?: UserRepository;

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   * - column typing struct
   */

  @Property({ length: 80 })
  first_name: string;

  @Property({ length: 80 })
  last_name: string;

  @Property({
    columnType:
      "varchar(160) generated always as (first_name || ' ' || last_name) stored",
    ignoreSchemaChanges: ['type', 'extra'],
    nullable: true,
  })
  full_name: string;

  @Property({ unique: true })
  email: string;

  @Property({ length: 50, unique: true })
  user_name: string;

  @Property({ hidden: true, length: 118 })
  password: string;

  @Property({ type: 'boolean', default: false })
  is_online: boolean;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   * - define Shared model relationships
   */

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */
  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await argon2.hash(this.password, { saltLength: 32 });
  }

  /**
   * ------------------------------------------------------
   * Custom Methods
   * ------------------------------------------------------
   */
  @Enum({
    items: () => ['first_name', 'last_name', 'email', 'user_name'],
    persist: false,
  })
  search_fields: string[] = ['first_name', 'last_name', 'email', 'user_name'];

  /**
   * ------------------------------------------------------
   * Query Scopes
   * ------------------------------------------------------
   */

  constructor(data: Partial<UserEntity>) {
    super();
    this.assign(data);
  }
}
