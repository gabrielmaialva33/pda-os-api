import { Prisma, PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';

import { UserEntity } from '../../src/modules/user/entities/user.entity';

const prisma = new PrismaClient();

prisma.$use(UserEntity.hashPassword);

const users: Array<Prisma.UserCreateInput> = [
  {
    first_name: 'Gabriel',
    last_name: 'Maia',
    email: 'maia@pda.com',
    user_name: 'maia',
    password: '123456',
  },
  {
    first_name: 'Pda',
    last_name: 'Admin',
    email: 'pda@pda.com',
    user_name: 'pda',
    password: '123456',
  },
];

async function UserSeed() {
  for (const user of users)
    await prisma.user.create({
      data: user,
    });
}

UserSeed().then(() => Logger.log('Users seeded', 'Seed'));
