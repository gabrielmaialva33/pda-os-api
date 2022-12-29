import { faker } from '@faker-js/faker';

import { Role } from '@modules/role/entities/role.entity';
import { RoleType } from '@modules/role/enum/role-type.enum';

export const RoleMock = (role?: RoleType) => {
  const role$ = new Role();

  const name = role
    ? role
    : faker.helpers.arrayElement(Object.values(RoleType));

  Object.assign(role$, {
    id: faker.datatype.uuid(),
    name,
    slug: name.toUpperCase(),
    description: faker.lorem.paragraph(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
  });

  return role$;
};

export const RoleMocks = (mocks: number) => {
  const roles: Role[] = [];
  for (let i = 0; i < mocks; i++)
    roles.push(
      RoleMock(faker.helpers.arrayElement([...Object.values(RoleType)])),
    );
  return roles;
};
