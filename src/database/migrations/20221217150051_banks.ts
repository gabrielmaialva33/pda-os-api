import { Knex } from 'knex';
import { Bank } from '@modules/bank/entities/bank.entity';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(Bank.tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('name', 100).notNullable();
    table.string('agency', 100).notNullable();
    table.string('account', 100).notNullable();
    table.string('pix', 100).notNullable();
    table.uuid('collaborator_id').notNullable();

    table
      .foreign('collaborator_id')
      .references('id')
      .inTable('collaborators')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.boolean('is_deleted').notNullable().defaultTo(false);

    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(Bank.tableName);
}
