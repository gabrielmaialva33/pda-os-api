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
