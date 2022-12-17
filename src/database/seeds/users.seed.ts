import { Knex } from 'knex';
import { User } from '@modules/user/entities/user.entity';
import { faker } from '@faker-js/faker';
import { Argon2Utils } from '@common/helpers';
import { Role } from '@modules/role/entities/role.entity';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex<User>(User.tableName).del();

  // Get roles from database
  const roles = await knex<Role>(Role.tableName).returning('id');

  // Inserts seed entries
  for (let i = 0; i < 100; i++) {
    const [{ id: userId }] = await knex<User>(User.tableName)
      .insert({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        user_name: faker.internet.userName(),
        password: await Argon2Utils.hash('123456'),
        avatar: faker.image.avatar(),
        is_online: faker.datatype.boolean(),
        is_deleted: faker.datatype.boolean(),
      })
      .returning('id');

    await knex('user_roles').insert({
      user_id: userId,
      role_id: roles[i % roles.length].id,
    });
  }
}
