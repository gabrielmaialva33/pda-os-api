import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { I18nService } from 'nestjs-i18n';

import { CollaboratorController } from '@modules/collaborator/controllers/collaborator.controller';
import { CollaboratorService } from '@modules/collaborator/services/collaborator.service';
import { CollaboratorRepository } from '@modules/collaborator/repositories/collaborator.repository';
import { RoleRepository } from '@modules/role/repositories/role.repository';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { PhoneRepository } from '@modules/phone/repositories/phone.repository';
import { AddressRepository } from '@modules/address/repositories/address.repository';
import { BankRepository } from '@modules/bank/repositories/bank.repository';
import { UserService } from '@modules/user/services/user.service';
import { RoleService } from '@modules/role/services/role.service';
import { PhoneService } from '@modules/phone/services/phone.service';
import { AddressService } from '@modules/address/services/address.service';
import { BankService } from '@modules/bank/services/bank.service';

describe('CollaboratorController', () => {
  let controller: CollaboratorController;

  // service dependencies mocks
  const mockI18nService = createMock<I18nService>();

  // repository dependencies mocks
  const mockCollaboratorRepository = createMock<CollaboratorRepository>();
  const mockRoleRepository = createMock<RoleRepository>();
  const mockUserRepository = createMock<UserRepository>();
  const mockPhoneRepository = createMock<PhoneRepository>();
  const mockAddressRepository = createMock<AddressRepository>();
  const mockBankRepository = createMock<BankRepository>();

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollaboratorController],
      providers: [
        CollaboratorService,
        UserService,
        RoleService,
        PhoneService,
        AddressService,
        BankService,
        {
          provide: CollaboratorRepository,
          useValue: mockCollaboratorRepository,
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
          provide: BankRepository,
          useValue: mockBankRepository,
        },
        {
          provide: I18nService,
          useValue: mockI18nService,
        },
      ],
    }).compile();

    controller = module.get<CollaboratorController>(CollaboratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
