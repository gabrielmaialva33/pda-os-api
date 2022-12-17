import { Knex } from 'knex';
import { Address } from '@modules/address/entities/address.entity';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(Address.tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('street', 100).notNullable();
    table.string('number', 10).nullable();
    table.string('complement', 100).nullable();
    table.string('neighborhood', 100).notNullable();
    table.string('city', 100).notNullable();
    table.string('state', 2).notNullable();
    table.string('zip_code', 10).notNullable();

    table.boolean('is_deleted').notNullable().defaultTo(false);

    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(Address.tableName);
}
