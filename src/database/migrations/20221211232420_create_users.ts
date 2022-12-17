import { Knex } from 'knex';
import { User } from '@modules/user/entities/user.entity';
import { Role } from '@modules/role/entities/role.entity';
import { Argon2Utils } from '@common/helpers';

export async function up(knex: Knex): Promise<void> {
  const roles = await knex
    .from<Role>(Role.tableName)
    .select('id')
    .orderBy('created_at', 'asc');

  const password = await Argon2Utils.hash('Pda@551238');

  const users = await knex
    .into<User>(User.tableName)
    .insert([
      {
        first_name: 'Root',
        last_name: 'Pda',
        email: 'root@pda.com.br',
        user_name: 'root',
        password,
      },
      {
        first_name: 'Admin',
        last_name: 'Pda',
        email: 'admin@pda.com.br',
        user_name: 'admin',
        password,
      },
      {
        first_name: 'Collaborator',
        last_name: 'Pda',
        email: 'collaborator@pda.com.br',
        user_name: 'collaborator',
        password,
      },
      {
        first_name: 'Client',
        last_name: 'Pda',
        email: 'client@pda.com.br',
        user_name: 'client',
        password,
      },
      {
        first_name: 'User',
        last_name: 'Pda',
        email: 'user@pda.com.br',
        user_name: 'user',
        password,
      },
    ])
    .returning('id');

  for (let i = 0; i < users.length; i++)
    await knex.into('user_roles').insert({
      user_id: users[i].id,
      role_id: roles[i].id,
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.from<User>('users').del();
}
