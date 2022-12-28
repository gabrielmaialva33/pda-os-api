import { Test, TestingModule } from '@nestjs/testing';
import { NestI18nModule } from '@lib/i18n/i18n.module';
import { I18nService } from 'nestjs-i18n';
import { createMock } from '@golevelup/ts-jest';
import { from, lastValueFrom, of } from 'rxjs';

import { UserMock } from '@/_mocks_';

import { UserController } from '@modules/user/controllers/user.controller';
import { UserService } from '@modules/user/services/user.service';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { RoleRepository } from '@modules/role/repositories/role.repository';
import { CreateUserDto, UpdateUserDto } from '@modules/user/dto';
import { RoleType } from '@modules/role/enum/role-type.enum';

describe('UserController', () => {
  let controller: UserController;

  // service dependencies mocks
  const mockI18nService = createMock<I18nService>();

  // repository dependencies mocks
  const mockUserRepository = createMock<UserRepository>();
  const mockRoleRepository = createMock<RoleRepository>();

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      imports: [NestI18nModule],
      controllers: [UserController],
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: RoleRepository, useValue: mockRoleRepository },
        { provide: I18nService, useValue: mockI18nService },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be able to get a user by id', async () => {
    const mockedUser = await UserMock(RoleType.USER);

    mockUserRepository.getBy = jest.fn().mockReturnValue(of(mockedUser));
    const user = await lastValueFrom(controller.get(mockedUser.id));

    expect(user).toEqual(mockedUser);
    expect(mockUserRepository.getBy).toBeCalledTimes(1);

    jest.clearAllMocks();
  });

  it('should be able to create a user', async () => {
    const mockedUser = await UserMock(RoleType.USER);

    mockUserRepository.create = jest.fn().mockImplementation((data: any) => {
      Object.assign(mockedUser, data);
      return from(of(mockedUser));
    });
    mockUserRepository.getBy = jest.fn().mockReturnValue(of(mockedUser));
    mockUserRepository.syncRoles = jest.fn().mockReturnValue(of(mockedUser));
    mockRoleRepository.getBy = jest
      .fn()
      .mockReturnValue(of(mockedUser['roles'][0]));

    const CreateUserDto = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@pda.com.br',
      user_name: 'john',
      password: '123456',
      role: RoleType.USER,
    } as CreateUserDto;

    const result = await lastValueFrom(controller.create(CreateUserDto));

    expect(result).toEqual(mockedUser);
    expect(mockUserRepository.create).toBeCalledTimes(1);
    expect(mockUserRepository.syncRoles).toBeCalledTimes(1);
    expect(mockRoleRepository.getBy).toBeCalledTimes(1);

    expect(result.first_name).toEqual(CreateUserDto.first_name);
    expect(result.last_name).toEqual(CreateUserDto.last_name);
    expect(result.email).toEqual(CreateUserDto.email);
    expect(result.user_name).toEqual(CreateUserDto.user_name);

    jest.clearAllMocks();
  });

  it('should be able to update a user', async () => {
    const mockedUser = await UserMock(RoleType.USER);

    mockUserRepository.update = jest
      .fn()
      .mockImplementation((id: string, data: any) => {
        Object.assign(mockedUser, data);
        return from(of(mockedUser));
      });

    mockUserRepository.getBy.mockReturnValue(of(mockedUser));
    mockUserRepository.syncRoles.mockReturnValue(of(mockedUser));
    mockRoleRepository.getBy.mockReturnValue(of(mockedUser['roles'][0]));

    const UpdateUserDto = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@pda.com.br',
      user_name: 'john',
      password: '123456',
      role: RoleType.USER,
    } as UpdateUserDto;

    const result = await lastValueFrom(
      controller.update(mockedUser.id, UpdateUserDto),
    );

    expect(result).toEqual(mockedUser);

    expect(mockUserRepository.update).toBeCalledTimes(1);
    expect(mockUserRepository.syncRoles).toBeCalledTimes(1);
    expect(mockRoleRepository.getBy).toBeCalledTimes(1);

    expect(result.first_name).toEqual(UpdateUserDto.first_name);
    expect(result.last_name).toEqual(UpdateUserDto.last_name);
    expect(result.email).toEqual(UpdateUserDto.email);
    expect(result.user_name).toEqual(UpdateUserDto.user_name);
  });
});
