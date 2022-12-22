import { Knex } from 'knex';

import { ScheduleCollaborator } from '@modules/schedule/entities/schedule-collaborator.entity';
import { RoleCollaborator } from '@modules/schedule/enum/role-collaborator.enum';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(ScheduleCollaborator.tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.uuid('schedule_id').notNullable();
    table.uuid('collaborator_id').notNullable();
    table
      .enum('role', [...Object.values(RoleCollaborator)])
      .notNullable()
      .defaultTo(RoleCollaborator.MEMBER);

    table
      .foreign('schedule_id')
      .references('id')
      .inTable('schedules')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .foreign('collaborator_id')
      .references('id')
      .inTable('collaborators')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(ScheduleCollaborator.tableName);
}
