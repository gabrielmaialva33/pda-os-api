import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { createMock } from '@golevelup/ts-jest';
import { I18nService } from 'nestjs-i18n';
import { from, lastValueFrom, map } from 'rxjs';

import { UserRepository } from '@modules/user/repositories/user.repository';
import { UserService } from '@modules/user/services/user.service';
import { RoleService } from '@modules/role/services/role.service';
import { AuthService } from '@modules/auth/services/auth.service';
import { RoleRepository } from '@modules/role/repositories/role.repository';
import { UserMock } from '@/_mocks_';

describe('AuthService', () => {
  let service: AuthService;
  // user mock
  const mockUser = from(UserMock()).pipe(map((user) => user));

  // service dependencies
  const mockI18nService = createMock<I18nService>();
  const mockJwtService = createMock<JwtService>();
  const mockRoleService = createMock<RoleService>();
  const mockUserService = createMock<UserService>();

  // repository dependencies
  const mockUserRepository = createMock<UserRepository>();
  const roleRepository = createMock<RoleRepository>();

  mockUserRepository.getBy.mockReturnValue(mockUser);
  mockJwtService.sign.mockReturnValue('token');

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: I18nService, useValue: mockI18nService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: RoleService, useValue: mockRoleService },
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: RoleRepository, useValue: roleRepository },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be validate', async () => {
    const userMock = await lastValueFrom(mockUser);

    service.validate(userMock.user_name, '123456').subscribe((user) => {
      expect(user).toStrictEqual(mockUser);
      expect(mockUserRepository.getBy).toBeCalledTimes(1);
    });

    service.validate(userMock.email, '1234567').subscribe((user) => {
      expect(user).toBeNull();
      expect(mockUserRepository.getBy).toBeCalledTimes(2);
    });
  });

  it('should be login', async () => {
    const userMock = await lastValueFrom(mockUser);

    service
      .login({ uid: userMock.user_name, password: '123456' })
      .subscribe((auth) => {
        expect(auth.user).toStrictEqual({
          id: userMock.id,
          first_name: userMock.first_name,
          last_name: userMock.last_name,
          full_name: userMock.full_name,
          email: userMock.email,
          user_name: userMock.user_name,
          avatar: userMock.avatar,
        });

        expect(auth.token).toBe('token');
      });
  });
});
