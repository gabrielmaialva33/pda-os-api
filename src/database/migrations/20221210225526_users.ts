import { Knex } from 'knex';

import { User } from '@modules/user/entities/user.entity';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.createTable(User.tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('first_name', 80).notNullable();
    table.string('last_name', 80).notNullable();
    table
      .specificType(
        'full_name',
        "varchar(160) generated always as (first_name || ' ' || last_name) stored",
      )
      .nullable();
    table.string('email').notNullable().unique();
    table.string('user_name', 50).notNullable().unique();
    table.string('password', 118).notNullable();
    table.string('avatar', 255).nullable();
    table.boolean('is_online').defaultTo(false);

    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(User.tableName);
}
