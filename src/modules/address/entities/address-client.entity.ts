import {
  BaseEntity,
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

import { AddressEntity } from '@address/entities/address.entity';
import { ClientEntity } from '@client/entities/client.entity';
import { DateTime } from 'luxon';

@Entity({
  tableName: 'addresses_clients',
  comment: 'AddressClientEntity Pivot Table',
})
export class AddressClientEntity extends BaseEntity<AddressClientEntity, 'id'> {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id: string;

  @ManyToOne({
    entity: () => AddressEntity,
    primary: true,
    onDelete: 'cascade',
    referencedColumnNames: ['id'],
  })
  address: AddressEntity;

  @ManyToOne({
    entity: () => ClientEntity,
    primary: true,
    onDelete: 'cascade',
    referencedColumnNames: ['id'],
  })
  client: ClientEntity;

  @Property({
    name: 'assigned_at',
    type: 'datetime',
    defaultRaw: 'now()',
    onCreate: () => DateTime.local().toISO(),
  })
  assigned_at: DateTime;
}
