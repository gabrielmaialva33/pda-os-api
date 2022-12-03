import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserEntity } from '@user/entities/user.entity';
import { RoleEntity } from '@role/entities/role.entity';

export class UsersSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const users = await em.find(UserEntity, {
      user_name: {
        $in: ['root', 'admin', 'user', 'guest'],
      },
    });
    if (users.length > 0) return;

    const roles = await em.find(RoleEntity, {
      name: {
        $in: ['root', 'admin', 'user', 'guest'],
      },
    });

    for (const role of roles) {
      if (role.name === 'root') {
        const root = em.create(UserEntity, {
          first_name: 'Pda',
          last_name: 'Root',
          email: 'root@pda.com',
          user_name: 'root',
          password: 'Pda@551238',
        });
        root.roles.add(role);
        await em.persistAndFlush(root);
      }

      if (role.name === 'admin') {
        const admin = em.create(UserEntity, {
          first_name: 'Pda',
          last_name: 'Admin',
          email: 'admin@pda.com',
          user_name: 'admin',
          password: 'Pda@551238',
        });
        admin.roles.add(role);
        await em.persistAndFlush(admin);
      }

      if (role.name === 'user') {
        const user = em.create(UserEntity, {
          first_name: 'Pda',
          last_name: 'User',
          email: 'user@pda.com',
          user_name: 'user',
          password: 'Pda@551238',
        });
        user.roles.add(role);
        await em.persistAndFlush(user);
      }

      if (role.name === 'guest') {
        const guest = em.create(UserEntity, {
          first_name: 'Pda',
          last_name: 'Guest',
          email: 'guest@pda.com',
          user_name: 'guest',
          password: 'Pda@551238',
        });
        guest.roles.add(role);
        await em.persistAndFlush(guest);
      }
    }
  }
}
