import { Test, TestingModule } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';
import { createMock } from '@golevelup/ts-jest';
import { from, lastValueFrom, map, of } from 'rxjs';

import { RoleMock, UserMock } from '@/_mocks_';

import { UserService } from '@modules/user/services/user.service';
import { RoleService } from '@modules/role/services/role.service';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { RoleRepository } from '@modules/role/repositories/role.repository';

describe('UserService', () => {
  let service: UserService;
  // mock entities
  const mockUser = from(UserMock()).pipe(map((user) => user));
  const userMockUpdated = from(UserMock()).pipe(map((user) => user));
  const mockRole = of(RoleMock());

  // service dependencies mocks
  const mockI18nService = createMock<I18nService>();

  // repository dependencies mocks
  const mockUserRepository = createMock<UserRepository>();
  const mockRoleRepository = createMock<RoleRepository>();

  // mock`s methods
  mockRoleRepository.getBy = jest.fn().mockReturnValue(mockRole);
  mockUserRepository.getBy = jest.fn().mockReturnValue(mockUser);
  mockUserRepository.create = jest.fn().mockReturnValue(mockUser);
  mockUserRepository.update = jest.fn().mockReturnValue(userMockUpdated);
  mockUserRepository.syncRoles = jest.fn().mockReturnValue(mockUser);

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        RoleService,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: RoleRepository, useValue: mockRoleRepository },
        { provide: I18nService, useValue: mockI18nService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be able to get a user', async () => {
    const userMock = await lastValueFrom(mockUser);

    const user = await lastValueFrom(service.get(userMock.id));

    expect(user).toEqual(userMock);
    expect(mockUserRepository.getBy).toBeCalledTimes(1);

    expect(user.id).toEqual(userMock.id);
    expect(user.email).toEqual(userMock.email);
    expect(user.first_name).toEqual(userMock.first_name);
    expect(user.last_name).toEqual(userMock.last_name);
    expect(user.user_name).toEqual(userMock.user_name);
    expect(user.avatar).toEqual(userMock.avatar);

    expect(user['roles']).toEqual(userMock['roles']);
  });

  it('should be able to get a user by email', async () => {
    const userMock = await lastValueFrom(mockUser);
    const user = await lastValueFrom(service.getBy(['email'], userMock.email));

    expect(user).toEqual(userMock);
    expect(mockUserRepository.getBy).toBeCalledTimes(1);

    expect(user.id).toEqual(userMock.id);
    expect(user.email).toEqual(userMock.email);
    expect(user.first_name).toEqual(userMock.first_name);
    expect(user.last_name).toEqual(userMock.last_name);
    expect(user.user_name).toEqual(userMock.user_name);
    expect(user.avatar).toEqual(userMock.avatar);
  });

  it('should be able to get a user by user_name', async () => {
    const userMock = await lastValueFrom(mockUser);

    const user = await lastValueFrom(
      service.getBy(['user_name'], userMock.user_name),
    );

    expect(user).toEqual(userMock);
    expect(mockUserRepository.getBy).toBeCalledTimes(1);

    expect(user.id).toEqual(userMock.id);
    expect(user.email).toEqual(userMock.email);
    expect(user.first_name).toEqual(userMock.first_name);
    expect(user.last_name).toEqual(userMock.last_name);
    expect(user.user_name).toEqual(userMock.user_name);
    expect(user.avatar).toEqual(userMock.avatar);
  });

  it('should be able to get a user by email or user_name', async () => {
    const userMock = await lastValueFrom(mockUser);

    const user = await lastValueFrom(
      service.getBy(['email', 'user_name'], userMock.email),
    );

    expect(user).toEqual(userMock);
    expect(mockUserRepository.getBy).toBeCalledTimes(1);

    expect(user.id).toEqual(userMock.id);
    expect(user.email).toEqual(userMock.email);
    expect(user.first_name).toEqual(userMock.first_name);
    expect(user.last_name).toEqual(userMock.last_name);
    expect(user.user_name).toEqual(userMock.user_name);
    expect(user.avatar).toEqual(userMock.avatar);
  });

  it('should be able to create a user', async () => {
    const userMock = await lastValueFrom(mockUser);

    const result = await lastValueFrom(
      service.create({
        first_name: userMock.first_name,
        last_name: userMock.last_name,
        email: userMock.email,
        user_name: userMock.user_name,
        password: userMock.password,
        avatar: userMock.avatar,
        role: userMock['roles'][0].name,
      }),
    );

    expect(result).toEqual(userMock);
    expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
    expect(mockRoleRepository.getBy).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.syncRoles).toHaveBeenCalledTimes(1);

    expect(result.first_name).toEqual(userMock.first_name);
    expect(result.last_name).toEqual(userMock.last_name);
    expect(result.email).toEqual(userMock.email);
    expect(result.user_name).toEqual(userMock.user_name);
    expect(result.avatar).toEqual(userMock.avatar);

    expect(result['roles']).toEqual(userMock['roles']);
  });

  it('should be able to update a user', async () => {
    const userMock = await lastValueFrom(userMockUpdated);

    const user = await lastValueFrom(
      service.update(userMock.id, {
        first_name: userMock.first_name,
        last_name: userMock.last_name,
        email: userMock.email,
        user_name: userMock.user_name,
        avatar: userMock.avatar,
      }),
    );

    expect(user).toEqual(userMock);
    expect(mockUserRepository.getBy).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.syncRoles).toHaveBeenCalledTimes(0);
    expect(mockRoleRepository.getBy).toHaveBeenCalledTimes(0);

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('first_name');
    expect(user).toHaveProperty('last_name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('user_name');
    expect(user).toHaveProperty('avatar');

    expect(user.first_name).toEqual(userMock.first_name);
    expect(user.last_name).toEqual(userMock.last_name);
    expect(user.email).toEqual(userMock.email);
    expect(user.user_name).toEqual(userMock.user_name);
    expect(user.avatar).toEqual(userMock.avatar);
  });
});
