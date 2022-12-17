import { Knex } from 'knex';

import { AddressClient } from '@modules/address/entities/address-client.entity';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(AddressClient.tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.uuid('address_id').notNullable();
    table.uuid('client_id').notNullable();

    table
      .foreign('address_id')
      .references('id')
      .inTable('addresses')
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
  await knex.schema.dropTable(AddressClient.tableName);
}
