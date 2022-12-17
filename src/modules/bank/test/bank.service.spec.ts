import { Test, TestingModule } from '@nestjs/testing';
import { BankService } from '@modules/bank/services/bank.service';

describe('BankService', () => {
  let service: BankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankService],
    }).compile();

    service = module.get<BankService>(BankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
