import { BaseEntity } from '@common/entities/base.entity';
import {
  Entity,
  EntityData,
  EntityRepositoryType,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { AddressRepository } from '@collaborator/repositories/address.repository';
import { CollaboratorEntity } from '@collaborator/entities/collaborator.entity';

@Entity({
  tableName: 'addresses',
  comment: 'AddressEntity Table',
  customRepository: () => AddressRepository,
})
export class AddressEntity extends BaseEntity {
  [EntityRepositoryType]?: AddressRepository;

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   * - column typing struct
   */
  @Property({ nullable: true, length: 100 })
  street: string;

  @Property({ nullable: true, length: 10 })
  number: string;

  @Property({ nullable: true, length: 100 })
  complement: string;

  @Property({ nullable: true, length: 100 })
  neighborhood: string;

  @Property({ nullable: true, length: 100 })
  city: string;

  @Property({ nullable: true, length: 2 })
  state: string;

  @Property({ nullable: true, length: 10 })
  zip_code: string;

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

  /**
   * ------------------------------------------------------
   * Query Scopes
   * ------------------------------------------------------
   */

  constructor(data: EntityData<AddressEntity>) {
    super();
    Object.assign(this, data);
  }
}
