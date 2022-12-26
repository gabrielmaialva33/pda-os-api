import { Test, TestingModule } from '@nestjs/testing';
import { from, lastValueFrom, map } from 'rxjs';

import { AuthService } from '@modules/auth/services/auth.service';
import { AuthController } from '@modules/auth/controllers/auth.controller';
import { UserMock } from '@/_mocks_';
import { createMock } from '@golevelup/ts-jest';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';

describe('AuthController', () => {
  let controller: AuthController;
  // user mock
  const mockUser = from(UserMock()).pipe(map((user) => user));

  // service dependencies
  const mockI18nService = createMock<I18nService>();
  const mockJwtService = createMock<JwtService>();

  // repository dependencies
  const mockUserRepository = createMock<UserRepository>();

  // mock`s
  mockUserRepository.getBy.mockReturnValue(mockUser);
  mockJwtService.sign.mockReturnValue('token');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: I18nService,
          useValue: mockI18nService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be sing in with username', async () => {
    const userMock = await lastValueFrom(mockUser);

    const signIn = await controller.signIn({
      uid: userMock.user_name,
      password: '123456',
    });

    signIn.subscribe((data) => {
      expect(mockUserRepository.getBy).toBeCalledTimes(1);
      expect(mockJwtService.sign).toBeCalledTimes(1);

      expect(data.auth.token).toBe('token');
      expect(data.user).toStrictEqual(userMock);
    });
  });

  it('should be sing in with email', async () => {
    const userMock = await lastValueFrom(mockUser);

    const signIn = await controller.signIn({
      uid: userMock.email,
      password: '123456',
    });

    signIn.subscribe((data) => {
      expect(mockUserRepository.getBy).toBeCalledTimes(1);
      expect(mockJwtService.sign).toBeCalledTimes(1);

      expect(data.auth.token).toBe('token');
      expect(data.user).toStrictEqual(userMock);
    });
  });
});
