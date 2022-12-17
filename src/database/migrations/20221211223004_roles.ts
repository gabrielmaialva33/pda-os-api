import { Knex } from 'knex';

import { Role } from '@modules/role/entities/role.entity';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(Role.tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('slug', 80).notNullable();
    table.string('name', 80).notNullable().unique();
    table.string('description', 160).nullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(Role.tableName);
}
