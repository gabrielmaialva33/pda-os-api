import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { PhoneService } from '@modules/phone/services/phone.service';
import { PhoneRepository } from '@modules/phone/repositories/phone.repository';
import { I18nService } from 'nestjs-i18n';

describe('PhoneService', () => {
  let service: PhoneService;

  // service dependencies mocks
  const mockI18nService = createMock<I18nService>();

  // repository dependencies mocks
  const mockPhoneRepository = createMock<PhoneRepository>();

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<PhoneService>(PhoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
