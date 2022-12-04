import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';

import { AddressRepository } from '@address/repositories/address.repository';
import { BaseEntity } from '@common/entities/base.entity';

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

  constructor(data: Partial<AddressEntity>) {
    super();
    Object.assign(this, data);
  }
}
