import { Knex } from 'knex';

import { Client } from '@modules/client/entities/client.entity';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(Client.tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('cpf', 14).notNullable();
    table.string('rg', 18).notNullable();
    table.date('birth_date').notNullable();
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
  await knex.schema.dropTable(Client.tableName);
}
