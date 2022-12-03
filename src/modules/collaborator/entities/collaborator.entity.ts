import { BaseEntity } from '@common/entities/base.entity';
import {
  Collection,
  Embedded,
  Entity,
  EntityData,
  EntityRepositoryType,
  Enum,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { CollaboratorRepository } from '@collaborator/repositories/collaborator.repository';
import { DateTime } from 'luxon';
import { Sexes, Status, WorkTypes } from '@common/types/enums';
import { CivilStatus } from '@common/types/enums/civil-status.enum';
import { PhoneEntity } from '@collaborator/entities/phone.entity';
import { AddressEntity } from '@collaborator/entities/address.entity';
import { UserEntity } from '@user/entities/user.entity';

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

  @Property({ nullable: true })
  role: string;

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
  @OneToOne(() => UserEntity)
  user: UserEntity;

  @OneToMany(() => PhoneEntity, (phone) => phone.collaborator)
  phones: Collection<PhoneEntity> = new Collection<PhoneEntity>(this);

  @OneToMany(() => AddressEntity, (address) => address.collaborator)
  addresses: Collection<AddressEntity> = new Collection<AddressEntity>(this);

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

  constructor(data: EntityData<CollaboratorEntity>) {
    super();
    Object.assign(this, data);
  }
}
