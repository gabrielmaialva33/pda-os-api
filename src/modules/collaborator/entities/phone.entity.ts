import { BaseEntity } from '@common/entities/base.entity';
import {
  Entity,
  EntityData,
  EntityRepositoryType,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { PhoneRepository } from '@collaborator/repositories/phone.repository';
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
  cell_phone: string;

  @Property({ nullable: true, length: 20 })
  fixed_phone: string;

  @Property({ nullable: true, length: 20 })
  commercial_phone: string;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   * - define model relationships
   */
  @ManyToOne(() => CollaboratorEntity, {
    hidden: true,
  })
  collaborator: CollaboratorEntity;

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
  constructor(data: EntityData<PhoneEntity>) {
    super();
    Object.assign(this, data);
  }
}
