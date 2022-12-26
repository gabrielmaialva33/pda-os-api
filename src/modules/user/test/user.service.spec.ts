import { Test, TestingModule } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';

import { UserService } from '@modules/user/services/user.service';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { createMock } from '@golevelup/ts-jest';
import { UserMock } from '@/_mocks_';
import { from, lastValueFrom, map, of } from 'rxjs';
import { RoleService } from '@modules/role/services/role.service';
import { RoleRepository } from '@modules/role/repositories/role.repository';
import { RoleType } from '@modules/role/enum/role-type.enum';
import { RoleMock } from '@/_mocks_/role.mock';

describe('UserService', () => {
  let service: UserService;
  // mock entities
  const mockUser = from(UserMock()).pipe(map((user) => user));
  const mockRole = of(RoleMock());

  // service dependencies mocks
  const mockI18nService = createMock<I18nService>();

  // repository dependencies mocks
  const mockUserRepository = createMock<UserRepository>();
  const mockRoleRepository = createMock<RoleRepository>();

  // mock`s methods
  mockRoleRepository.getBy.mockReturnValue(mockRole);
  mockUserRepository.getBy.mockReturnValue(mockUser);
  mockUserRepository.create.mockReturnValue(mockUser);

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

  it('should be able to create a user', async () => {
    const userMock = await lastValueFrom(mockUser);

    service
      .create({
        first_name: userMock.first_name,
        last_name: userMock.last_name,
        email: userMock.email,
        user_name: userMock.user_name,
        password: userMock.password,
        avatar: userMock.avatar,
        role: RoleType.ADMIN,
      })
      .subscribe((user) => {
        console.log(user);
      });
  });
});
