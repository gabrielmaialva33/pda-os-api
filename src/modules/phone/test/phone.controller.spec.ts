import { Test, TestingModule } from '@nestjs/testing';

import { PhoneController } from '@modules/phone/controllers/phone.controller';
import { PhoneService } from '@modules/phone/services/phone.service';

describe('PhoneController', () => {
  let controller: PhoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneController],
      providers: [PhoneService],
    }).compile();

    controller = module.get<PhoneController>(PhoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
