import {
  BeforeCreate,
  BeforeUpdate,
  Cascade,
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  EventArgs,
  LoadStrategy,
  ManyToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';

import { BaseEntity } from '@src/common/entities/base.entity';
import { UserRepository } from '@user/repositories/user.repository';
import { RoleEntity } from '@role/entities/role.entity';
import { CollaboratorEntity } from '@collaborator/entities/collaborator.entity';

import { Argon2Utils } from '@common/helpers';

@Entity({
  tableName: 'users',
  collection: 'users',
  comment: 'UserEntity Table',
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

  @Property({
    length: 255,
    nullable: true,
  })
  avatar: string;

  @Property({ type: 'boolean', default: false })
  is_online: boolean;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   * - define model relationships
   */
  @ManyToMany({
    entity: () => RoleEntity,
    //pivotEntity: () => UserRoleEntity,
    pivotTable: 'users_roles',
    joinColumn: 'user_id',
    inverseJoinColumn: 'role_id',
    strategy: LoadStrategy.JOINED,
    cascade: [Cascade.REMOVE],
  })
  roles: Collection<RoleEntity> = new Collection<RoleEntity>(this);

  @OneToOne({
    entity: () => CollaboratorEntity,
    mappedBy: (collaborator) => collaborator.user,
    cascade: [Cascade.REMOVE],
    nullable: true,
    hidden: true,
  })
  collaborator?: CollaboratorEntity;

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */
  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword(arguments_: EventArgs<this>) {
    if (arguments_.changeSet.payload?.password)
      this.password = await Argon2Utils.hash(this.password);
  }

  @BeforeCreate()
  async attachGuestRole(arguments_: EventArgs<this>) {
    if (arguments_.changeSet.entity.roles.getItems().length === 0) {
      const guestRole = await arguments_.em.getRepository(RoleEntity).findOne({
        name: 'guest',
      });
      this.roles.add(guestRole);
    }
  }

  /**
   * ------------------------------------------------------
   * Methods
   * ------------------------------------------------------
   */
  @Enum({
    items: () => [
      'first_name',
      'last_name',
      'email',
      'user_name',
      'code',
      'phone',
      'cpf',
    ],
    persist: false,
    hidden: true,
  })
  search_fields: string[];

  /**
   * ------------------------------------------------------
   * Query Scopes
   * ------------------------------------------------------
   */

  constructor({ collaborator, ...data }: Partial<UserEntity>) {
    super();
    Object.assign(this, {
      ...data,
      avatar: `https://api.multiavatar.com/${data.user_name.toLowerCase()}.svg`,
    });
    this.collaborator = collaborator
      ? new CollaboratorEntity(collaborator)
      : null;
  }
}
