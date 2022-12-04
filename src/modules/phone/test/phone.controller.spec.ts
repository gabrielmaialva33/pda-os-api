import { Test, TestingModule } from '@nestjs/testing';
import { PhoneController } from '@phone/http/phone.controller';
import { PhoneService } from '@phone/services/phone.service';

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
