import { Test, TestingModule } from '@nestjs/testing';
import { BankController } from '@modules/bank/controllers/bank.controller';
import { BankService } from '@modules/bank/services/bank.service';
import { createMock } from '@golevelup/ts-jest';
import { I18nService } from 'nestjs-i18n';
import { BankRepository } from '@modules/bank/repositories/bank.repository';

describe('BankController', () => {
  let controller: BankController;

  // service dependencies mocks
  const mockI18nService = createMock<I18nService>();

  // repository dependencies mocks
  const mockBankRepository = createMock<BankRepository>();

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankController],
      providers: [
        BankService,
        { provide: BankRepository, useValue: mockBankRepository },
        { provide: I18nService, useValue: mockI18nService },
      ],
    }).compile();

    controller = module.get<BankController>(BankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
