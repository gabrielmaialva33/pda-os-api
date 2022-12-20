import { Module } from '@nestjs/common';
import { OrmModule } from '@lib/orm/orm.module';

import { OrderRepository } from '@modules/order/repositories/order.repository';
import { OrderController } from '@modules/order/controllers/order.controller';
import { OrderService } from '@modules/order/services/order.service';

@Module({
  imports: [OrmModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
