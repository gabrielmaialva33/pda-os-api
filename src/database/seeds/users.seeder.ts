import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserEntity } from '@user/entities/user.entity';

export class UsersSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const users = await em.find(UserEntity, {
      user_name: {
        $in: ['root', 'admin', 'user', 'guest'],
      },
    });
    if (users.length > 0) return;

    const root = em.create(UserEntity, {
      first_name: 'Pda',
      last_name: 'Root',
      email: 'root@pda.com',
      user_name: 'root',
      password: '123456',
    });

    const admin = em.create(UserEntity, {
      first_name: 'Pda',
      last_name: 'Admin',
      email: 'admin@pda.com',
      user_name: 'admin',
      password: '123456',
    });

    const user = em.create(UserEntity, {
      first_name: 'Pda',
      last_name: 'User',
      email: 'user@pda.com',
      user_name: 'user',
      password: '123456',
    });

    const guest = em.create(UserEntity, {
      first_name: 'Pda',
      last_name: 'Guest',
      email: 'guest@pda.com',
      user_name: 'guest',
      password: '123456',
    });

    return em.persistAndFlush([root, admin, user, guest]);
  }
}
