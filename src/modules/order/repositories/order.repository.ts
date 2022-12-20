import { BaseRepository } from '@common/repositories/base.repository';
import { Order } from '@modules/order/entities/order.entity';

export class OrderRepository extends BaseRepository<Order> {
  constructor() {
    super(Order);
  }
}
