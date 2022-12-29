import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { ClientService } from '@modules/client/services/client.service';
import { ClientRepository } from '@modules/client/repositories/client.repository';
import { RoleService } from '@modules/role/services/role.service';
import { RoleRepository } from '@modules/role/repositories/role.repository';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { UserService } from '@modules/user/services/user.service';
import { PhoneRepository } from '@modules/phone/repositories/phone.repository';
import { AddressRepository } from '@modules/address/repositories/address.repository';
import { PhoneService } from '@modules/phone/services/phone.service';
import { AddressService } from '@modules/address/services/address.service';
import { I18nService } from 'nestjs-i18n';

describe('ClientService', () => {
  let service: ClientService;

  // service dependencies mocks
  const mockI18nService = createMock<I18nService>();

  // repository dependencies mocks
  const mockClientRepository = createMock<ClientRepository>();
  const mockRoleRepository = createMock<RoleRepository>();
  const mockUserRepository = createMock<UserRepository>();
  const mockPhoneRepository = createMock<PhoneRepository>();
  const mockAddressRepository = createMock<AddressRepository>();

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        RoleService,
        UserService,
        PhoneService,
        AddressService,
        {
          provide: ClientRepository,
          useValue: mockClientRepository,
        },
        {
          provide: RoleRepository,
          useValue: mockRoleRepository,
        },
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: PhoneRepository,
          useValue: mockPhoneRepository,
        },
        {
          provide: AddressRepository,
          useValue: mockAddressRepository,
        },
        {
          provide: I18nService,
          useValue: mockI18nService,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
