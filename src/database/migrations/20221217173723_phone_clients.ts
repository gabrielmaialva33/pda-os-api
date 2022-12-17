import { Knex } from 'knex';

import { PhoneClient } from '@modules/phone/entities/phone-client.entity';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(PhoneClient.tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.uuid('phone_id').notNullable();
    table.uuid('client_id').notNullable();

    table
      .foreign('phone_id')
      .references('id')
      .inTable('phones')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .foreign('client_id')
      .references('id')
      .inTable('clients')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(PhoneClient.tableName);
}
