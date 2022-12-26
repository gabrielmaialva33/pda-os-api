import { faker } from '@faker-js/faker';
import { Role } from '@modules/role/entities/role.entity';
import { RoleType } from '@modules/role/enum/role-type.enum';

export const RoleMock = () => {
  const role = new Role();

  Object.assign(role, {
    id: faker.datatype.uuid(),
    name: faker.helpers.arrayElement(Object.values(RoleType)).toLowerCase(),
    slug: faker.helpers.arrayElement(Object.values(RoleType)),
    description: faker.lorem.paragraph(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
  });

  return role;
};
