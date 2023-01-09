import { Order } from '@modules/order/entities/order.entity';
import {
  IBaseRepository,
  ListOptions,
} from '@common/interfaces/base-repository.interface';
import { Observable } from 'rxjs';

export interface IOrderRepository extends IBaseRepository<Order> {
  paginate(
    options: ListOptions<Order>,
  ): Observable<{ results: Order[]; total: number }>;
}
