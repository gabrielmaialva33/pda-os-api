import { z } from '@lib/zod/z';
import { isExists } from '@lib/zod/refine.zod';
import { CreateZodDto } from '@lib/zod';

import { Shop } from '@modules/shop/entities/shop.entity';
import { OrderStatus } from '@modules/order/enum/order-status.enum';
import { Schedule } from '@modules/schedule/entities/schedule.entity';

export const CreateOrderSchema = z.object({
  report: z.string().trim(),
  accessories: z.string().trim(),
  note: z.string().trim(),
  status: z.nativeEnum(OrderStatus),
  shop_id: z
    .string()
    .trim()
    .uuid()
    .superRefine(async (value, ctx) =>
      isExists<Shop>({ model: Shop, field: 'id', value, ctx }),
    ),
  schedule_ids: z.array(
    z
      .string()
      .trim()
      .uuid()
      .superRefine(async (value, ctx) =>
        isExists<Schedule>({ model: Schedule, field: 'id', value, ctx }),
      ),
  ),
});

export class CreateOrderDto extends CreateZodDto(CreateOrderSchema) {}
