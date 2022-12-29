import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { createMock } from '@golevelup/ts-jest';
import { I18nService } from 'nestjs-i18n';
import { lastValueFrom, of } from 'rxjs';

import { UserRepository } from '@modules/user/repositories/user.repository';
import { UserService } from '@modules/user/services/user.service';
import { RoleService } from '@modules/role/services/role.service';
import { AuthService } from '@modules/auth/services/auth.service';
import { RoleRepository } from '@modules/role/repositories/role.repository';

import { UserMock } from '@/_mocks_';

describe('AuthService', () => {
  let service: AuthService;

  // service dependencies
  const mockI18nService = createMock<I18nService>();
  const mockJwtService = createMock<JwtService>();

  // repository dependencies
  const mockUserRepository = createMock<UserRepository>();
  const mockRoleRepository = createMock<RoleRepository>();

  mockJwtService.sign.mockReturnValue('token');

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        RoleService,
        { provide: I18nService, useValue: mockI18nService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: RoleRepository, useValue: mockRoleRepository },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be validate username', async () => {
    const mockUser = await UserMock();

    mockUserRepository.getBy.mockClear();
    mockUserRepository.getBy.mockReturnValue(of(mockUser));

    const validate$ = service.validate(mockUser.user_name, '123456');

    const result = await lastValueFrom(validate$);

    expect(result).toStrictEqual(mockUser);
    expect(mockUserRepository.getBy).toBeCalledTimes(1);
  });

  it('should be validate email', async () => {
    const mockUser = await UserMock();

    mockUserRepository.getBy.mockClear();
    mockUserRepository.getBy.mockReturnValue(of(mockUser));

    const validate$ = service.validate(mockUser.email, '123456');
    const result = await lastValueFrom(validate$);

    expect(result).toStrictEqual(mockUser);
    expect(mockUserRepository.getBy).toBeCalledTimes(1);
  });

  it('should be login username', async () => {
    const mockUser = await UserMock();

    const login$ = service.login({
      uid: mockUser.user_name,
      password: '123456',
    });

    const result = await lastValueFrom(login$);

    expect(result.user).toStrictEqual({
      id: result.user.id,
      first_name: result.user.first_name,
      last_name: result.user.last_name,
      full_name: result.user.full_name,
      email: result.user.email,
      user_name: result.user.user_name,
      avatar: result.user.avatar,
    });
    expect(result.auth.token).toBe('token');
  });

  it('should be login with email', async () => {
    const mockUser = await UserMock();

    const login$ = service.login({ uid: mockUser.email, password: '123456' });
    const result = await lastValueFrom(login$);

    expect(result.user).toStrictEqual({
      id: result.user.id,
      first_name: result.user.first_name,
      last_name: result.user.last_name,
      full_name: result.user.full_name,
      email: result.user.email,
      user_name: result.user.user_name,
      avatar: result.user.avatar,
    });

    expect(result.auth.token).toBe('token');
  });
});
