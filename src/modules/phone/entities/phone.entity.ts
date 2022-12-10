import {
  Cascade,
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  LoadStrategy,
  ManyToMany,
  Property,
} from '@mikro-orm/core';

import { BaseEntity } from '@common/entities/base.entity';
import { PhoneRepository } from '@phone/repositories/phone.repository';
import { PhoneType } from '@common/types/enums/phone-type.enum';
import { PhoneCollaboratorEntity } from '@phone/entities/phone-collaborator.entity';
import { CollaboratorEntity } from '@collaborator/entities/collaborator.entity';

@Entity({
  tableName: 'phones',
  comment: 'PhoneEntity Table',
  customRepository: () => PhoneRepository,
})
export class PhoneEntity extends BaseEntity {
  [EntityRepositoryType]?: PhoneRepository;

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   * - column typing struct
   */

  @Property({ nullable: true, length: 20 })
  phone: string;

  @Enum({
    items: () => PhoneType,
    default: PhoneType.NOT_INFORMED,
  })
  type: PhoneType;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   * - define model relationships
   */
  @ManyToMany({
    entity: () => CollaboratorEntity,
    pivotEntity: () => PhoneCollaboratorEntity,
    pivotTable: 'phones_collaborators',
    joinColumn: 'collaborator_id',
    inverseJoinColumn: 'phone_id',
    strategy: LoadStrategy.JOINED,
    cascade: [Cascade.REMOVE],
    hidden: true,
  })
  collaborators: Collection<CollaboratorEntity> =
    new Collection<CollaboratorEntity>(this);

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

  constructor(data: Partial<PhoneEntity>) {
    super();
    Object.assign(this, data);
  }
}
