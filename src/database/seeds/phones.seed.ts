import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import { Phone } from '@modules/phone/entities/phone.entity';
import { PhoneType } from '@modules/phone/enum/phone-type.enum';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(Phone.tableName).del();

  // Inserts seed entries
  for (let i = 0; i < 100; i++) {
    await knex<Phone>(Phone.tableName).insert({
      phone: faker.phone.number('(##) #####-####'),
      type: faker.helpers.arrayElement(Object.values(PhoneType)),
      is_deleted: faker.datatype.boolean(),
    });
  }
}
