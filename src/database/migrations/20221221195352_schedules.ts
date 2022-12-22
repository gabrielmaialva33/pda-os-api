import { Knex } from 'knex';

import { Schedule } from '@modules/schedule/entities/schedule.entity';
import { ScheduleStatus } from '@modules/schedule/enum/schedule-status.enum';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(Schedule.tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.date('date').notNullable();
    table.time('start_time').notNullable();
    table.time('end_time').notNullable();
    table.text('note').nullable();
    table
      .enum('status', Object.values(ScheduleStatus))
      .notNullable()
      .defaultTo(ScheduleStatus.PENDING);
    table.uuid('shop_id').notNullable();

    table
      .foreign('shop_id')
      .references('id')
      .inTable('shops')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(Schedule.tableName);
}
