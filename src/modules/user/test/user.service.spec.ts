import { Test, TestingModule } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';

import { UserService } from '@modules/user/services/user.service';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { createMock } from '@golevelup/ts-jest';

describe('UserService', () => {
  let service: UserService;

  const mockI18n = createMock<I18nService>();
  const mockUserRepository = createMock<UserRepository>();

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: I18nService,
          useValue: mockI18n,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });
});
