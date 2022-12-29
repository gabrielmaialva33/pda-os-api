import { Test, TestingModule } from '@nestjs/testing';

import { ShopService } from '@modules/shop/services/shop.service';
import { ShopController } from '@modules/shop/controllers/shop.controller';
import { createMock } from '@golevelup/ts-jest';
import { I18nService } from 'nestjs-i18n';
import { ShopRepository } from '@modules/shop/repositories/shop.repository';

describe('ShopController', () => {
  let controller: ShopController;

  // service dependencies mocks
  const mockI18nService = createMock<I18nService>();

  // repository dependencies mocks
  const mockShopRepository = createMock<ShopRepository>();

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopController],
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

    controller = module.get<ShopController>(ShopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
