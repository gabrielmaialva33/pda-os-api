import { Cascade, Entity, OneToOne, Property } from '@mikro-orm/core';
import { CollaboratorEntity } from '@collaborator/entities/collaborator.entity';
import { BaseEntity } from '@common/entities/base.entity';

@Entity({ tableName: 'banks', comment: 'BankEntity Table' })
export class BankEntity extends BaseEntity {
  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   * - column typing struct
   */
  @Property({ nullable: true, length: 100 })
  name: string;

  @Property({ nullable: true, length: 100 })
  agency: string;

  @Property({ nullable: true, length: 100 })
  account: string;

  @Property({ nullable: true, length: 255 })
  pix: string;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   * - define model relationships
   */
  @OneToOne({
    entity: () => CollaboratorEntity,
    inversedBy: (collaborator) => collaborator.bank,
    cascade: [Cascade.REMOVE],
    onDelete: 'cascade',
    orphanRemoval: true,
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
   * Query Scopes
   * ------------------------------------------------------
   */

  /**
   * ------------------------------------------------------
   * Methods
   * ------------------------------------------------------
   */
  constructor(bank: Partial<BankEntity>) {
    super();
    Object.assign(this, bank);
  }
}
