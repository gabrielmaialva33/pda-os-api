import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '@modules/order/controllers/order.controller';
import { OrderService } from '@modules/order/services/order.service';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
