import { Test, TestingModule } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';
import { createMock } from '@golevelup/ts-jest';

import { AddressRepository } from '@modules/address/repositories/address.repository';
import { AddressController } from '@modules/address/controllers/address.controller';
import { AddressService } from '@modules/address/services/address.service';
import { lastValueFrom, of } from 'rxjs';
import { AddressMock, AddressMocks } from '@/_mocks_';

describe('AddressController', () => {
  let controller: AddressController;

  // service dependencies mocks
  const mockI18nService = createMock<I18nService>();

  // repository dependencies mocks
  const mockAddressRepository = createMock<AddressRepository>();

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        AddressService,
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

    controller = module.get<AddressController>(AddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to paginate addresses', async () => {
    const mockAddresses = AddressMocks(20);

    const mockAddressList = {
      total: mockAddresses.length,
      results: mockAddresses,
    };

    mockAddressRepository.paginate.mockReturnValueOnce(of(mockAddressList));

    const paginate$ = controller.paginate(1, 10, 'id', 'asc');

    const result = await lastValueFrom(paginate$);

    expect(result.data).toEqual(mockAddresses);
    expect(result.meta.total).toEqual(mockAddresses.length);
    expect(result.meta.current_page).toEqual(1);
    expect(result.meta.per_page).toEqual(10);
  });

  it('should be able to list addresses', async () => {
    const mockAddresses = AddressMocks(20);

    mockAddressRepository.list.mockReturnValueOnce(of(mockAddresses));

    const list$ = controller.list('id', 'asc');
    const result = await lastValueFrom(list$);

    expect(result).toBeDefined();

    expect(result.length).toEqual(20);
  });

  it('should be able to get address', async () => {
    const mockAddress = AddressMock();

    mockAddressRepository.getBy.mockReturnValue(of(mockAddress));

    const get$ = controller.get(mockAddress.id);
    const result = await lastValueFrom(get$);

    expect(result).toBeDefined();
  });

  it('should be able to create address', async () => {
    const address = AddressMock();

    mockAddressRepository.create.mockReturnValue(of(address));
    mockAddressRepository.getBy.mockReturnValue(of(address));

    const create$ = controller.create({
      ...address,
    });

    const result = await lastValueFrom(create$);

    expect(result).toEqual(address);
  });
});
