import { Test, TestingModule } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';
import { createMock } from '@golevelup/ts-jest';
import { lastValueFrom, of } from 'rxjs';

import { RoleService } from '@modules/role/services/role.service';
import { RoleRepository } from '@modules/role/repositories/role.repository';
import { RoleType } from '@modules/role/enum/role-type.enum';
import { RoleMock, RoleMocks } from '@/_mocks_';

describe('RoleService', () => {
  let service: RoleService;

  // service dependencies mocks
  const mockI18nService = createMock<I18nService>();

  // repository dependencies mocks
  const mockRoleRepository = createMock<RoleRepository>();

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: RoleRepository,
          useValue: mockRoleRepository,
        },
        {
          provide: I18nService,
          useValue: mockI18nService,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get role', async () => {
    const mockRole = RoleMock();

    mockRoleRepository.getBy.mockReturnValue(of(mockRole));

    const role = await lastValueFrom(service.get(mockRole.id));

    expect(role).toEqual(mockRole);
    expect(mockRoleRepository.getBy).toBeCalledTimes(1);
    expect(mockRoleRepository.getBy).toBeCalledWith(['id'], mockRole.id);
  });

  it('should be get by role', async () => {
    const mockRole = RoleMock(RoleType.COLLABORATOR);

    mockRoleRepository.getBy.mockClear();
    mockRoleRepository.getBy.mockReturnValue(of(mockRole));

    const role = await lastValueFrom(service.getBy(['name'], RoleMock.name));

    expect(role).toBeDefined();
    expect(role).toEqual(mockRole);

    expect(mockRoleRepository.getBy).toBeCalledTimes(1);
  });

  it('should be list role', async () => {
    const mockRoles = RoleMocks(20);

    mockRoleRepository.list.mockReturnValue(of(mockRoles));

    const roles = await lastValueFrom(service.list({ sort: 'id' }));
    expect(roles).toBeDefined();

    expect(mockRoleRepository.list).toBeCalledTimes(1);
    expect(roles.length).toEqual(20);
  });

  it('should be able to paginate role', async () => {
    const mockRoles = RoleMocks(20);

    mockRoleRepository.paginate.mockReturnValue(
      of({ results: mockRoles, total: mockRoles.length }),
    );

    const result = await lastValueFrom(
      service.paginate({
        page: 1,
        per_page: 10,
      }),
    );

    expect(result).toBeDefined();
    expect(result.meta.total).toEqual(20);
    expect(mockRoleRepository.paginate).toBeCalledTimes(1);

    jest.clearAllMocks();
  });
});
