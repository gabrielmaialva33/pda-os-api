import { Prisma } from '@prisma/client';

export class StoreRoleDto implements Prisma.RoleCreateInput {
  name: string;

  users?: Prisma.UserCreateNestedManyWithoutRolesInput;
}
