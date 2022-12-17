import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from '@modules/client/controllers/client.controller';
import { ClientService } from '@modules/client/services/client.service';

describe('ClientController', () => {
  let controller: ClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService],
    }).compile();

    controller = module.get<ClientController>(ClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
