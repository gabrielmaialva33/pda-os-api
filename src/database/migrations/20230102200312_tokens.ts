import { Knex } from 'knex';

import { TokenType } from '@modules/token/enum/token-type.enum';
import { Token } from '@modules/token/entities/token.entity';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(Token.tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.uuid('user_id').notNullable();
    table.string('token', 360).notNullable();
    table.enum('type', Object.values(TokenType)).notNullable();
    table.boolean('is_revoked').notNullable().defaultTo(false);
    table.timestamp('expires_at').notNullable();

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(Token.tableName);
}
