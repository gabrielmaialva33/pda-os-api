import { BaseEntity } from '@common/entities/base.entity';
import {
  Cascade,
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  LoadStrategy,
  ManyToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { DateTime } from 'luxon';

import { CollaboratorRepository } from '@collaborator/repositories/collaborator.repository';
import { CivilStatus, Sexes, Status, WorkTypes } from '@common/types/enums';
import { UserEntity } from '@user/entities/user.entity';
import { PhoneEntity } from '@phone/entities/phone.entity';
import { PhoneCollaboratorEntity } from '@phone/entities/phone-collaborator.entity';
import { AddressEntity } from '@address/entities/address.entity';
import { AddressCollaboratorEntity } from '@address/entities/address-collaborator.entity';

@Entity({
  tableName: 'collaborators',
  comment: 'CollaboratorEntity Table',
  customRepository: () => CollaboratorRepository,
})
export class CollaboratorEntity extends BaseEntity {
  [EntityRepositoryType]?: CollaboratorRepository;

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   * - column typing struct
   */
  @Property({ nullable: true, length: 8 })
  code: string;

  @Property({ nullable: true, length: 14 })
  cpf: string;

  @Property({ nullable: true, length: 18 })
  rg: string;

  @Property({ nullable: true })
  birth_date: DateTime;

  @Property({ nullable: true, length: 100 })
  job: string;

  @Enum({
    items: () => Sexes,
    default: Sexes.NOT_INFORMED,
  })
  sex: Sexes = Sexes.NOT_INFORMED;

  @Enum({
    items: () => WorkTypes,
    default: WorkTypes.NOT_INFORMED,
  })
  work_type: WorkTypes = WorkTypes.NOT_INFORMED;

  @Enum({
    items: () => Status,
    default: Status.ACTIVE,
  })
  status: Status = Status.ACTIVE;

  @Enum({
    items: () => CivilStatus,
    default: CivilStatus.NOT_INFORMED,
  })
  civil_status: string = CivilStatus.NOT_INFORMED;

  @Property({ nullable: true, type: 'text' })
  description: string;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   * - define model relationships
   */
  @OneToOne({
    entity: () => UserEntity,
    cascade: [Cascade.ALL],
    orphanRemoval: true,
    inversedBy: (user) => user.collaborator,
    nullable: false,
  })
  user!: UserEntity;

  @ManyToMany({
    entity: () => PhoneEntity,
    //pivotEntity: () => PhoneCollaboratorEntity,
    pivotTable: 'phones_collaborators',
    joinColumn: 'collaborator_id',
    inverseJoinColumn: 'phone_id',
    strategy: LoadStrategy.JOINED,
    cascade: [Cascade.ALL],
  })
  phones?: Collection<PhoneEntity> = new Collection<PhoneEntity>(this);

  @ManyToMany({
    entity: () => AddressEntity,
    //pivotEntity: () => AddressCollaboratorEntity,
    pivotTable: 'addresses_collaborators',
    joinColumn: 'collaborator_id',
    inverseJoinColumn: 'address_id',
    strategy: LoadStrategy.JOINED,
    cascade: [Cascade.ALL],
  })
  addresses?: Collection<AddressEntity> = new Collection<AddressEntity>(this);

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

  constructor({ user, ...data }: Partial<CollaboratorEntity>) {
    super();
    Object.assign(this, data);
    this.user = user ? new UserEntity(user) : null;
  }
}
