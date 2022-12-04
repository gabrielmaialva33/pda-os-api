import {
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
export class PhoneCollaboratorEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id: string;

  @ManyToOne(() => CollaboratorEntity, {
    primary: true,
    cascade: [Cascade.ALL],
    onDelete: 'cascade',
    referencedColumnNames: ['id'],
  })
  collaborator: CollaboratorEntity;

  @ManyToOne(() => PhoneEntity, {
    primary: true,
    cascade: [Cascade.ALL],
    onDelete: 'cascade',
    referencedColumnNames: ['id'],
  })
  phone: PhoneEntity;

  @Property({
    name: 'assigned_at',
    type: 'datetime',
    defaultRaw: 'now()',
    onCreate: () => DateTime.local().toISO(),
  })
  assigned_at: DateTime;
}
