import { Test, TestingModule } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';
import { DateTime } from 'luxon';
import { createMock } from '@golevelup/ts-jest';
import { lastValueFrom, of } from 'rxjs';

import { UserMock, UserMocks } from '@/_mocks_';

import { UserService } from '@modules/user/services/user.service';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { RoleRepository } from '@modules/role/repositories/role.repository';
import { RoleType } from '@modules/role/enum/role-type.enum';

describe('UserService', () => {
  let service: UserService;

  // service dependencies mocks
  const mockI18nService = createMock<I18nService>();

  // repository dependencies mocks
  const mockUserRepository = createMock<UserRepository>();
  const mockRoleRepository = createMock<RoleRepository>();

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: RoleRepository, useValue: mockRoleRepository },
        { provide: I18nService, useValue: mockI18nService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to paginate users', async () => {
    const mockedUsers = await UserMocks(20);

    mockUserRepository.paginate = jest.fn().mockReturnValue(
      of({
        results: mockedUsers,
        total: mockedUsers.length,
      }),
    );
    const result = await lastValueFrom(
      service.paginate({
        page: 1,
        per_page: 10,
      }),
    );

    expect(result).toEqual({
      meta: {
        total: mockedUsers.length,
        current_page: 1,
        per_page: 10,
        total_pages: 2,
        first: '/users?per_page=10',
        previous: '',
        next: '/users?page=2&per_page=10',
        last: '/users?page=2&per_page=10',
      },
      data: mockedUsers,
    });
    expect(mockUserRepository.paginate).toBeCalledTimes(1);

    jest.clearAllMocks();
  });

  it('should be able to list users', async () => {
    const mockedUsers = await UserMocks(20);

    mockUserRepository.list = jest.fn().mockReturnValue(of(mockedUsers));
    const result = await lastValueFrom(
      service.list({
        sort: 'first_name',
        order: 'asc',
      }),
    );

    expect(result).toEqual(mockedUsers);
    expect(mockUserRepository.list).toBeCalledTimes(1);
    expect(mockUserRepository.list).toBeCalledWith({
      sort: 'first_name',
      order: 'asc',
    });
    expect(result.length).toBe(20);

    jest.clearAllMocks();
  });

  it('should be get user', async () => {
    const user = await UserMock(RoleType.ADMIN);

    mockUserRepository.getBy = jest.fn().mockReturnValue(of(user));

    const get$ = service.get(user.id);
    const result = await lastValueFrom(get$);

    expect(result).toEqual(user);
    expect(mockUserRepository.getBy).toBeCalledTimes(1);
    expect(mockUserRepository.getBy).toBeCalledWith(['id'], user.id, {
      populate: ['roles'],
    });

    expect(mockI18nService.t).toBeCalledTimes(0);

    expect(result.id).toEqual(user.id);
    expect(result.first_name).toEqual(user.first_name);
    expect(result.last_name).toEqual(user.last_name);
    expect(result.full_name).toEqual(user.full_name);
    expect(result.email).toEqual(user.email);
    expect(result.user_name).toEqual(user.user_name);
    expect(result.avatar).toEqual(user.avatar);
    expect(result.is_online).toEqual(user.is_online);
  });

  it('should be get by user name', async () => {
    const user = await UserMock(RoleType.ADMIN);

    mockUserRepository.getBy.mockClear();
    mockUserRepository.getBy.mockReturnValue(of(user));

    const get$ = service.getBy(['user_name'], user.user_name);
    const result = await lastValueFrom(get$);

    expect(result).toEqual(user);
    expect(mockUserRepository.getBy).toBeCalledTimes(1);
    expect(mockUserRepository.getBy).toBeCalledWith(
      ['user_name'],
      user.user_name,
      { populate: ['roles'] },
    );

    expect(mockI18nService.t).toBeCalledTimes(0);

    expect(result.id).toEqual(user.id);
    expect(result.first_name).toEqual(user.first_name);
    expect(result.last_name).toEqual(user.last_name);
    expect(result.full_name).toEqual(user.full_name);
    expect(result.email).toEqual(user.email);
    expect(result.user_name).toEqual(user.user_name);
    expect(result.avatar).toEqual(user.avatar);
    expect(result.is_online).toEqual(user.is_online);
  });

  it('should be get by email', async () => {
    const user = await UserMock(RoleType.ADMIN);

    mockUserRepository.getBy.mockClear();
    mockUserRepository.getBy.mockReturnValue(of(user));

    const get$ = service.getBy(['email'], user.email);
    const result = await lastValueFrom(get$);

    expect(result).toEqual(user);
    expect(mockUserRepository.getBy).toBeCalledTimes(1);
    expect(mockUserRepository.getBy).toBeCalledWith(['email'], user.email, {
      populate: ['roles'],
    });

    expect(mockI18nService.t).toBeCalledTimes(0);

    expect(result.id).toEqual(user.id);
    expect(result.first_name).toEqual(user.first_name);
    expect(result.last_name).toEqual(user.last_name);
    expect(result.full_name).toEqual(user.full_name);
    expect(result.email).toEqual(user.email);
    expect(result.user_name).toEqual(user.user_name);
    expect(result.avatar).toEqual(user.avatar);
    expect(result.is_online).toEqual(user.is_online);
  });

  it('should be create user', async () => {
    const data = await UserMock(RoleType.ADMIN);

    mockUserRepository.create = jest.fn().mockReturnValue(of(data));
    mockUserRepository.getBy = jest.fn().mockReturnValue(of(data));
    mockUserRepository.syncRoles = jest.fn().mockReturnValue(of(data));
    mockRoleRepository.getBy = jest.fn().mockReturnValue(of(data['roles'][0]));

    const create$ = service.create({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      user_name: data.user_name,
      password: data.password,
      role: data['roles'][0].name,
    });
    const result = await lastValueFrom(create$);

    expect(result).toEqual(data);
    expect(mockRoleRepository.getBy).toBeCalledTimes(1);
    expect(mockRoleRepository.getBy).toBeCalledWith(
      ['name'],
      data['roles'][0].name,
    );
    expect(mockUserRepository.create).toBeCalledTimes(1);
    expect(mockUserRepository.syncRoles).toBeCalledTimes(1);
    expect(mockI18nService.t).toBeCalledTimes(0);
  });

  it('should be update user', async () => {
    const user = await UserMock(RoleType.ADMIN);
    const data = await UserMock(RoleType.USER);

    mockUserRepository.update = jest
      .fn()
      .mockImplementation((id: string, data: any) => {
        Object.assign(user, data);
        return of(user);
      });
    mockUserRepository.getBy.mockReturnValue(of(data));
    mockUserRepository.syncRoles.mockReturnValue(of(data));
    mockRoleRepository.getBy.mockReturnValue(of(data['roles'][0]));

    const update$ = service.update(user.id, {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      user_name: data.user_name,
      password: data.password,
      role: RoleType.USER,
    });
    const result = await lastValueFrom(update$);

    expect(result).toEqual(data);
    expect(mockRoleRepository.getBy).toBeCalledTimes(1);
    expect(mockRoleRepository.getBy).toBeCalledWith(
      ['name'],
      data['roles'][0].name,
    );
    expect(mockUserRepository.update).toBeCalledTimes(1);
    expect(mockUserRepository.syncRoles).toBeCalledTimes(1);
    expect(mockI18nService.t).toBeCalledTimes(0);
  });

  it('should be delete user', async () => {
    const user = await UserMock(RoleType.ADMIN);

    mockUserRepository.getBy = jest.fn().mockReturnValue(of(user));
    mockUserRepository.softDelete = jest.fn().mockReturnValue(
      of(
        Object.assign(user, {
          email: `${user.email}-${user.id.slice(0, 8)}`,
          user_name: `${user.user_name}-${user.id.slice(0, 8)}`,
          is_deleted: true,
          deleted_at: DateTime.now(),
        }),
      ),
    );

    const delete$ = service.remove(user.id);
    const result = await lastValueFrom(delete$);

    expect(result).toEqual(user);
    expect(mockUserRepository.getBy).toBeCalledTimes(0);

    expect(mockUserRepository.softDelete).toBeCalledTimes(1);
    expect(mockUserRepository.softDelete).toBeCalledWith(user.id);
    expect(mockI18nService.t).toBeCalledTimes(0);

    expect(result.id).toEqual(user.id);
    expect(result.first_name).toEqual(user.first_name);
    expect(result.last_name).toEqual(user.last_name);
    expect(result.full_name).toEqual(user.full_name);
    expect(result.avatar).toEqual(user.avatar);
    expect(result.is_online).toEqual(user.is_online);
    expect(result.is_deleted).toEqual(true);
    expect(result.deleted_at).toBeDefined();
  });
});
