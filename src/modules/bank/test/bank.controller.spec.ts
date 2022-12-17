import { Test, TestingModule } from '@nestjs/testing';
import { BankController } from '@modules/bank/controllers/bank.controller';
import { BankService } from '@modules/bank/services/bank.service';

describe('BankController', () => {
  let controller: BankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankController],
      providers: [BankService],
    }).compile();

    controller = module.get<BankController>(BankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
