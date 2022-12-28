import { faker } from '@faker-js/faker';

import { Argon2Utils } from '@common/helpers';
import { RoleMock } from '@/_mocks_/role.mock';

import { User } from '@modules/user/entities/user.entity';
import { RoleType } from '@modules/role/enum/role-type.enum';

export const UserMock = async (role?: RoleType) => {
  const user = new User();

  const role$ = RoleMock(role);
  const fullName = faker.name.fullName();

  Object.assign(user, {
    id: faker.datatype.uuid(),
    first_name: fullName.split(' ')[0],
    last_name: fullName.split(' ')[1],
    full_name: fullName,
    email: faker.internet.email(),
    user_name: faker.internet.userName().toLowerCase(),
    password: await Argon2Utils.hash('123456'),
    avatar: faker.image.avatar(),
    is_deleted: false,
    is_online: faker.datatype.boolean(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    deleted_at: null,
    roles: [{ ...role$ }],
  });

  return user;
};

export const UserMocks = async (mocks: number) => {
  const users = [];
  for (let i = 0; i < mocks; i++)
    users.push(
      await UserMock(faker.helpers.arrayElement([...Object.values(RoleType)])),
    );
  return users;
};
