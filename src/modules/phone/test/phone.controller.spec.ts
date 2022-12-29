import { Test, TestingModule } from '@nestjs/testing';

import { PhoneController } from '@modules/phone/controllers/phone.controller';
import { PhoneService } from '@modules/phone/services/phone.service';
import { createMock } from '@golevelup/ts-jest';
import { I18nService } from 'nestjs-i18n';
import { PhoneRepository } from '@modules/phone/repositories/phone.repository';

describe('PhoneController', () => {
  let controller: PhoneController;

  // service dependencies mocks
  const mockI18nService = createMock<I18nService>();

  // repository dependencies mocks
  const mockPhoneRepository = createMock<PhoneRepository>();

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneController],
      providers: [
        PhoneService,
        {
          provide: PhoneRepository,
          useValue: mockPhoneRepository,
        },
        {
          provide: I18nService,
          useValue: mockI18nService,
        },
      ],
    }).compile();

    controller = module.get<PhoneController>(PhoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
