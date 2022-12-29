import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { ShopService } from '@modules/shop/services/shop.service';
import { ShopRepository } from '@modules/shop/repositories/shop.repository';
import { I18nService } from 'nestjs-i18n';

describe('ShopService', () => {
  let service: ShopService;

  // service dependencies mocks
  const mockI18nService = createMock<I18nService>();

  // repository dependencies mocks
  const mockShopRepository = createMock<ShopRepository>();

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopService,
        {
          provide: ShopRepository,
          useValue: mockShopRepository,
        },
        {
          provide: I18nService,
          useValue: mockI18nService,
        },
      ],
    }).compile();

    service = module.get<ShopService>(ShopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
