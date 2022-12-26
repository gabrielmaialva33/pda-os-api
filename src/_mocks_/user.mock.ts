import { faker } from '@faker-js/faker';

import { User } from '@modules/user/entities/user.entity';
import { Argon2Utils } from '@common/helpers';

export const UserMock = async () => {
  const user = new User();

  Object.assign(user, {
    id: faker.datatype.uuid(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    full_name: faker.name.fullName(),
    email: faker.internet.email(),
    user_name: faker.internet.userName().toLowerCase(),
    avatar: faker.image.avatar(),
    password: await Argon2Utils.hash('123456'),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
  });

  return user;
};

export const UsersMock = async (count: number) => {
  const users = [];
  for (let i = 0; i < count; i++) users.push(await UserMock());
  return users;
};
