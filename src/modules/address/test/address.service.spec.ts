import { Test, TestingModule } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';
import { createMock } from '@golevelup/ts-jest';

import { AddressService } from '@modules/address/services/address.service';
import { AddressRepository } from '@modules/address/repositories/address.repository';
import { AddressMock, AddressMocks } from '@/_mocks_';
import { lastValueFrom, of } from 'rxjs';

describe('AddressService', () => {
  let service: AddressService;

  // service dependencies mocks
  const mockI18nService = createMock<I18nService>();

  // repository dependencies mocks
  const mockAddressRepository = createMock<AddressRepository>();

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to paginate addresses', async () => {
    const mockAddresses = AddressMocks(20);

    const mockAddressList = {
      total: mockAddresses.length,
      results: mockAddresses,
    };

    mockAddressRepository.paginate.mockReturnValueOnce(of(mockAddressList));

    const paginate$ = service.paginate({ page: 1, per_page: 10 });

    const result = await lastValueFrom(paginate$);

    expect(result.data).toEqual(mockAddresses);
    expect(result.meta.total).toEqual(mockAddresses.length);
    expect(result.meta.current_page).toEqual(1);
    expect(result.meta.per_page).toEqual(10);

    expect(mockAddressRepository.paginate).toHaveBeenCalledTimes(1);
    expect(mockAddressRepository.paginate).toHaveBeenCalledWith({
      page: 1,
      per_page: 10,
    });
  });

  it('should be able to list addresses', async () => {
    const mockAddresses = AddressMocks(20);

    mockAddressRepository.list.mockReturnValueOnce(of(mockAddresses));

    const list$ = service.list({});
    const result = await lastValueFrom(list$);

    expect(result).toEqual(mockAddresses);

    expect(mockAddressRepository.list).toHaveBeenCalledTimes(1);
  });

  it('should be able get a address', async () => {
    const mockAddress = AddressMock();

    mockAddressRepository.getBy.mockReturnValue(of(mockAddress));

    const get$ = service.get(mockAddress.id);
    const result = await lastValueFrom(get$);

    expect(result).toBeDefined();
    expect(result).toEqual(mockAddress);

    expect(mockAddressRepository.getBy).toHaveBeenCalledTimes(1);
    expect(mockAddressRepository.getBy).toHaveBeenCalledWith(
      ['id'],
      mockAddress.id,
    );
  });

  it('should be able create a address', async () => {
    const mockAddress = AddressMock();

    mockAddressRepository.create.mockReturnValue(of(mockAddress));
    mockAddressRepository.getBy.mockReturnValue(of(mockAddress));

    const create$ = service.create({
      ...mockAddress,
    });
    const result = await lastValueFrom(create$);

    expect(result).toBeDefined();
    expect(result).toEqual(mockAddress);

    expect(mockAddressRepository.create).toHaveBeenCalledTimes(1);
    expect(mockAddressRepository.create).toHaveBeenCalledWith(mockAddress);
  });

  it('should be able update a address', async () => {
    const mockAddress = AddressMock();

    mockAddressRepository.update = jest
      .fn()
      .mockImplementation((id: string, data) => {
        Object.assign(mockAddress, data);
        return of(mockAddress);
      });
    mockAddressRepository.getBy.mockReturnValue(of(mockAddress));

    const update$ = service.update(mockAddress.id, {
      ...mockAddress,
    });
    const result = await lastValueFrom(update$);

    expect(result).toBeDefined();
    expect(result).toEqual(mockAddress);

    expect(mockAddressRepository.update).toHaveBeenCalledTimes(1);
  });
});
