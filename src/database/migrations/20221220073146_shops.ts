import { Knex } from 'knex';
import { Shop } from '@modules/shop/entities/shop.entity';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(Shop.tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('code', 8).notNullable();
    table.string('name').notNullable();
    table.string('type').notNullable();
    table.float('cost').notNullable();
    table.float('profit').notNullable();
    table.decimal('percentage_profit').notNullable();
    table.float('net_profit').notNullable();
    table.float('sale_price').notNullable();
    table.decimal('commission').notNullable();
    table.boolean('send_sms').notNullable();
    table.float('forecast_return').notNullable();
    table.string('status').notNullable();

    table.uuid('client_id').notNullable();

    table
      .foreign('client_id')
      .references('id')
      .inTable('clients')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(Shop.tableName);
}
