import { Knex } from 'knex';

import { Collaborator } from '@modules/collaborator/entities/collaborator.entity';
import { SexType } from '@modules/collaborator/enum/sex-type.enum';
import { WorkType } from '@modules/collaborator/enum/work-type.enum';
import { StatusType } from '@modules/collaborator/enum/status-type.enum';
import { CivilStatusType } from '@modules/collaborator/enum/civil-status-type.enum';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(Collaborator.tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('code', 8).notNullable();
    table.string('cpf', 14).notNullable();
    table.string('rg', 18).notNullable();
    table.date('birth_date').notNullable();
    table.string('job', 100).notNullable();
    table
      .enum('sex', Object.values(SexType))
      .notNullable()
      .defaultTo(SexType.NOT_INFORMED);
    table
      .enum('work_type', Object.values(WorkType))
      .notNullable()
      .defaultTo(WorkType.NOT_INFORMED);
    table
      .enum('status', Object.values(StatusType))
      .notNullable()
      .defaultTo(StatusType.NOT_INFORMED);
    table
      .enum('civil_status', Object.values(CivilStatusType))
      .notNullable()
      .defaultTo(CivilStatusType.NOT_INFORMED);
    table.text('note').notNullable();

    table.uuid('user_id').notNullable();

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.boolean('is_deleted').notNullable().defaultTo(false);

    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(Collaborator.tableName);
}
