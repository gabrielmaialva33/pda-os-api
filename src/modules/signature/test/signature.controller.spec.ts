import { Test, TestingModule } from '@nestjs/testing';

import { SignatureController } from '@modules/signature/controllers/signature.controller';
import { SignatureService } from '@modules/signature/services/signature.service';

describe('SignatureController', () => {
  let controller: SignatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignatureController],
      providers: [SignatureService],
    }).compile();

    controller = module.get<SignatureController>(SignatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
