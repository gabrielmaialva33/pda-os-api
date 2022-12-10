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
import { PhoneEntity } from '@phone/entities/phone.entity';

@Entity({
  tableName: 'phones_collaborators',
  collection: 'phones_collaborators',
  comment: 'PhoneEntity Collaborator Pivot Table',
})
export class PhoneCollaboratorEntity extends BaseEntity<
  PhoneCollaboratorEntity,
  'id'
> {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id: string;

  @ManyToOne(() => PhoneEntity, {
    primary: true,
    onDelete: 'cascade',
    referencedColumnNames: ['id'],
  })
  phone: PhoneEntity;

  @ManyToOne(() => CollaboratorEntity, {
    primary: true,
    onDelete: 'cascade',
    referencedColumnNames: ['id'],
  })
  collaborator: CollaboratorEntity;

  @Property({
    name: 'assigned_at',
    type: 'datetime',
    defaultRaw: 'now()',
    onCreate: () => DateTime.local().toISO(),
  })
  assigned_at: DateTime;
}
