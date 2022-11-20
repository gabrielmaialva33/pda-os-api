import { Prisma, PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';

const prisma = new PrismaClient();

const roles: Array<Prisma.RoleCreateInput> = [
  {
    name: 'root',
  },
  {
    name: 'admin',
  },
  {
    name: 'user',
  },
  {
    name: 'guest',
  },
];

async function RoleSeed() {
  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];

    const roleExists = await prisma.role.findFirst({
      where: {
        name: role.name,
      },
    });
    if (!roleExists)
      await prisma.role.create({
        data: role,
      });
  }
}

RoleSeed().then(() => Logger.log('Roles seeded', 'Seed'));
