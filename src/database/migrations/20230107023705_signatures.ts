import { Knex } from 'knex';

import { Signature } from '@modules/signature/entities/signature.entity';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(Signature.tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('full_name').notNullable();
    table.string('rubric').notNullable();
    table.string('image_url').notNullable();

    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(Signature.tableName);
}
