import {
  Cascade,
  Collection,
  Entity,
  EntityRepositoryType,
  LoadStrategy,
  ManyToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { DateTime } from 'luxon';

import { BaseEntity } from '@common/entities/base.entity';
import { ClientRepository } from '@client/repositories/client.repository';
import { UserEntity } from '@user/entities/user.entity';
import { PhoneEntity } from '@phone/entities/phone.entity';
import { AddressEntity } from '@address/entities/address.entity';
import { PhoneClientEntity } from '@phone/entities/phone-client.entity';
import { AddressClientEntity } from '@address/entities/address-client.entity';

@Entity({
  tableName: 'clients',
  comment: 'ClientEntity table',
  customRepository: () => ClientRepository,
})
export class ClientEntity extends BaseEntity {
  [EntityRepositoryType]?: ClientRepository;

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   * - column typing struct
   */
  @Property({ nullable: true, length: 14 })
  cpf: string;

  @Property({ nullable: true, length: 18 })
  rg: string;

  @Property({ nullable: true })
  birth_date: DateTime;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   * - define model relationships
   */
  @OneToOne({
    entity: () => UserEntity,
    inversedBy: (user) => user.client,
    cascade: [Cascade.REMOVE],
    orphanRemoval: true,
    nullable: false,
  })
  user!: UserEntity;

  @ManyToMany({
    entity: () => PhoneEntity,
    pivotEntity: () => PhoneClientEntity,
    pivotTable: 'phones_clients',
    joinColumn: 'client_id',
    inverseJoinColumn: 'phone_id',
    strategy: LoadStrategy.JOINED,
    cascade: [Cascade.REMOVE],
  })
  phones?: Collection<PhoneEntity> = new Collection<PhoneEntity>(this);

  @ManyToMany({
    entity: () => AddressEntity,
    pivotEntity: () => AddressClientEntity,
    pivotTable: 'addresses_clients',
    joinColumn: 'client_id',
    inverseJoinColumn: 'address_id',
    strategy: LoadStrategy.JOINED,
    cascade: [Cascade.REMOVE],
  })
  addresses?: Collection<AddressEntity> = new Collection<AddressEntity>(this);

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */

  /**
   * ------------------------------------------------------
   * Query Scopes
   * ------------------------------------------------------
   */

  /**
   * ------------------------------------------------------
   * Methods
   * ------------------------------------------------------
   */
  constructor({ user, ...data }: Partial<ClientEntity>) {
    super();
    Object.assign(this, data);
    this.user = user ? new UserEntity(user) : null;
  }
}
