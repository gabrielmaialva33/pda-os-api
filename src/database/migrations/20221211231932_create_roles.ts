import { Knex } from 'knex';

import { Role } from '@modules/role/entities/role.entity';

export async function up(knex: Knex): Promise<void> {
  await knex.into<Role>(Role.tableName).insert([
    {
      name: 'root',
      slug: 'Root',
      description: 'Root do sistema',
    },
    {
      name: 'admin',
      slug: 'Admin',
      description: 'Administrador do sistema',
    },
    {
      name: 'collaborator',
      slug: 'Collaborator',
      description: 'Colaborador do sistema',
    },
    {
      name: 'client',
      slug: 'Client',
      description: 'Cliente do sistema',
    },
    {
      name: 'user',
      slug: 'User',
      description: 'Usuário do sistema',
    },
  ]);
}

export async function down(knex: Knex): Promise<void> {
  await knex.from<Role>('roles').del();
}
