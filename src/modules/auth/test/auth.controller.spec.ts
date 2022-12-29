import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { lastValueFrom, of } from 'rxjs';
import { createMock } from '@golevelup/ts-jest';

import { AuthService } from '@modules/auth/services/auth.service';
import { AuthController } from '@modules/auth/controllers/auth.controller';
import { UserRepository } from '@modules/user/repositories/user.repository';

import { UserMock } from '@/_mocks_';

describe('AuthController', () => {
  let controller: AuthController;

  // service dependencies
  const mockI18nService = createMock<I18nService>();
  const mockJwtService = createMock<JwtService>();

  // repository dependencies
  const mockUserRepository = createMock<UserRepository>();

  // mock`s
  mockJwtService.sign.mockReturnValue('token');

  beforeEach(async () => {
    jest.clearAllMocks();

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
    const userMock = await UserMock();

    mockUserRepository.getBy.mockClear();
    mockUserRepository.getBy.mockReturnValue(of(userMock));

    const signIn$ = controller.signIn({
      uid: userMock.user_name,
      password: '123456',
    });

    const result = await lastValueFrom(signIn$);

    expect(mockUserRepository.getBy).toBeCalledTimes(1);
    expect(mockJwtService.sign).toBeCalledTimes(1);

    expect(result.auth.token).toBe('token');
  });

  it('should be sing in with email', async () => {
    const userMock = await UserMock();

    mockUserRepository.getBy.mockClear();
    mockUserRepository.getBy.mockReturnValue(of(userMock));

    const signIn$ = await controller.signIn({
      uid: userMock.email,
      password: '123456',
    });

    const result = await lastValueFrom(signIn$);

    expect(mockUserRepository.getBy).toBeCalledTimes(1);
    expect(mockJwtService.sign).toBeCalledTimes(1);

    expect(result.auth.token).toBe('token');
  });
});
