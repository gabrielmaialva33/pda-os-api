import { Knex } from 'knex';

import { OrderSchedules } from '@modules/order/entities/order-schedules.entity';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(OrderSchedules.tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.uuid('order_id').notNullable();
    table.uuid('schedule_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table
      .foreign('order_id')
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE');

    table
      .foreign('schedule_id')
      .references('id')
      .inTable('schedules')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(OrderSchedules.tableName);
}
