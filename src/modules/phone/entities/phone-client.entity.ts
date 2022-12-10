import {
  BaseEntity,
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

import { ClientEntity } from '@client/entities/client.entity';
import { PhoneEntity } from '@phone/entities/phone.entity';
import { DateTime } from 'luxon';

@Entity({
  tableName: 'phones_clients',
  collection: 'phones_clients',
  comment: 'PhoneEntity Client Pivot Table',
})
export class PhoneClientEntity extends BaseEntity<PhoneClientEntity, 'id'> {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id: string;

  @ManyToOne({
    entity: () => PhoneEntity,
    primary: true,
    onDelete: 'cascade',
    referencedColumnNames: ['id'],
  })
  phone: PhoneEntity;

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
