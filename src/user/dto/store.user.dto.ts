import { Prisma } from '@prisma/client';

export class StoreUserDto implements Prisma.UserCreateInput {
  first_name: string;
  last_name: string;
  email: string;
  user_name: string;
  password: string;
}
