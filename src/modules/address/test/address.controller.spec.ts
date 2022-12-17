import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from '@modules/address/controllers/address.controller';
import { AddressService } from '@modules/address/services/address.service';

describe('AddressController', () => {
  let controller: AddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [AddressService],
    }).compile();

    controller = module.get<AddressController>(AddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
