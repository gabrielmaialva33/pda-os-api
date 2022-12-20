import { z } from '@lib/zod/z';
import { isExists } from '@lib/zod/refine.zod';
import { CreateZodDto } from '@lib/zod';

import { Client } from '@modules/client/entities/client.entity';
import { Shop } from '@modules/shop/entities/shop.entity';
import { OrderStatus } from '@modules/order/enum/order-status.enum';

export const CreateOrderSchema = z.object({
  client_id: z
    .string()
    .trim()
    .uuid()
    .superRefine(async (value, ctx) =>
      isExists<Client>({ model: Client, field: 'id', value, ctx }),
    ),
  shop_id: z
    .string()
    .trim()
    .uuid()
    .superRefine(async (value, ctx) =>
      isExists<Shop>({ model: Shop, field: 'id', value, ctx }),
    ),
  report: z.string().trim(),
  accessories: z.string().trim(),
  note: z.string().trim(),
  status: z.nativeEnum(OrderStatus),
});

export class CreateOrderDto extends CreateZodDto(CreateOrderSchema) {}
