import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { I18nService } from 'nestjs-i18n';

import { ClientController } from '@modules/client/controllers/client.controller';
import { ClientService } from '@modules/client/services/client.service';
import { ClientRepository } from '@modules/client/repositories/client.repository';
import { RoleRepository } from '@modules/role/repositories/role.repository';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { PhoneRepository } from '@modules/phone/repositories/phone.repository';
import { AddressRepository } from '@modules/address/repositories/address.repository';
import { RoleService } from '@modules/role/services/role.service';
import { UserService } from '@modules/user/services/user.service';
import { PhoneService } from '@modules/phone/services/phone.service';
import { AddressService } from '@modules/address/services/address.service';

describe('ClientController', () => {
  let controller: ClientController;

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
      controllers: [ClientController],
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

    controller = module.get<ClientController>(ClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
