import { Entity, EntityRepositoryType, Enum, Property } from '@mikro-orm/core';

import { BaseEntity } from '@common/entities/base.entity';
import { PhoneRepository } from '@phone/repositories/phone.repository';
import { PhoneType } from '@common/types/enums/phone-type.enum';

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
