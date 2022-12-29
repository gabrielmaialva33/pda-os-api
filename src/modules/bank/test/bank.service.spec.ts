import { Test, TestingModule } from '@nestjs/testing';
import { BankService } from '@modules/bank/services/bank.service';
import { createMock } from '@golevelup/ts-jest';
import { BankRepository } from '@modules/bank/repositories/bank.repository';
import { I18nService } from 'nestjs-i18n';

describe('BankService', () => {
  let service: BankService;

  // service dependencies mocks
  const mockI18nService = createMock<I18nService>();

  // repository dependencies mocks
  const mockBankRepository = createMock<BankRepository>();

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankService,
        { provide: BankRepository, useValue: mockBankRepository },
        { provide: I18nService, useValue: mockI18nService },
      ],
    }).compile();

    service = module.get<BankService>(BankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
