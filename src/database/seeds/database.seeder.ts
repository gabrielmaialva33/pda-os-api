import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UsersSeeder } from '@src/database/seeds/users.seeder';
import { RolesSeeder } from '@src/database/seeds/roles.seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [RolesSeeder, UsersSeeder]);
  }
}
