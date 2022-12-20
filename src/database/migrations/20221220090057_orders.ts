import { Knex } from 'knex';
import { Order } from '@modules/order/entities/order.entity';
import { OrderStatus } from '@modules/order/enum/order-status.enum';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(Order.tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.uuid('client_id').notNullable();
    table.uuid('shop_id').notNullable();
    table.string('report').notNullable();
    table.string('accessories').notNullable();
    table.string('note').notNullable();
    table
      .enum('status', Object.values(OrderStatus))
      .notNullable()
      .defaultTo(OrderStatus.PENDING);

    table
      .foreign('client_id')
      .references('id')
      .inTable('clients')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .foreign('shop_id')
      .references('id')
      .inTable('shops')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(Order.tableName);
}
