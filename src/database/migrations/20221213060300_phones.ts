import { Knex } from 'knex';

import { Phone } from '@modules/phone/entities/phone.entity';
import { PhoneType } from '@modules/phone/enum/phone-type.enum';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(Phone.tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('phone').notNullable();
    table
      .enum('type', Object.values(PhoneType))
      .notNullable()
      .defaultTo(PhoneType.NOT_INFORMED);

    table.boolean('is_deleted').notNullable().defaultTo(false);

    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(Phone.tableName);
}
