import {
  BaseEntity,
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { DateTime } from 'luxon';

import { CollaboratorEntity } from '@collaborator/entities/collaborator.entity';
import { AddressEntity } from '@address/entities/address.entity';

@Entity({
  tableName: 'addresses_collaborators',
  comment: 'AddressCollaboratorEntity Pivot Table',
})
export class AddressCollaboratorEntity extends BaseEntity<
  AddressCollaboratorEntity,
  'id'
> {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id: string;

  @ManyToOne({
    entity: () => CollaboratorEntity,
    primary: true,
    cascade: [Cascade.ALL],
    onDelete: 'cascade',
    referencedColumnNames: ['id'],
  })
  collaborator: CollaboratorEntity;

  @ManyToOne({
    entity: () => AddressEntity,
    primary: true,
    cascade: [Cascade.ALL],
    onDelete: 'cascade',
    referencedColumnNames: ['id'],
  })
  address: AddressEntity;

  @Property({
    name: 'assigned_at',
    type: 'datetime',
    defaultRaw: 'now()',
    onCreate: () => DateTime.local().toISO(),
  })
  assigned_at: DateTime;
}
