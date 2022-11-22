import { Prisma, PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';

import { UserEntity } from '../../src/modules/user/entities/user.entity';

const prisma = new PrismaClient();

prisma.$use(UserEntity.hashPassword);

const users: Array<Prisma.UserCreateInput> = [
  {
    first_name: 'Pda',
    last_name: 'Root',
    email: 'root@pda.com',
    user_name: 'root',
    password: '123456',
    roles: {
      create: [
        {
          role: { create: { name: 'root' } },
        },
      ],
    },
  },
  {
    first_name: 'Pda',
    last_name: 'Admin',
    email: 'admin@pda.com',
    user_name: 'admin',
    password: '123456',
    roles: {
      create: [
        {
          role: { create: { name: 'admin' } },
        },
      ],
    },
  },
  {
    first_name: 'Pda',
    last_name: 'User',
    email: 'user@pda.com',
    user_name: 'user',
    password: '123456',
    roles: {
      create: [
        {
          role: { create: { name: 'user' } },
        },
      ],
    },
  },
  {
    first_name: 'Pda',
    last_name: 'Guest',
    email: 'guest@pda.com',
    user_name: 'guest',
    password: '123456',
    roles: {
      create: [
        {
          role: { create: { name: 'guest' } },
        },
      ],
    },
  },
];

async function UserSeed() {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    const userExists = await prisma.user.findUnique({
      select: {
        id: true,
      },
      where: {
        user_name: user.user_name,
      },
    });

    if (!userExists)
      await prisma.user.create({
        data: user,
      });
  }
}

UserSeed().then(() => Logger.log('Users seeded', 'Seed'));
