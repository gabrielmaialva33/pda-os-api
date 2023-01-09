import { z } from '@lib/zod/z';
import { isExists } from '@lib/zod/refine.zod';
import { CreateZodDto } from '@lib/zod';

import { Shop } from '@modules/shop/entities/shop.entity';
import { OrderStatus } from '@modules/order/enum/order-status.enum';

export const UpdateOrderSchema = z.object({
  report: z.string().trim().optional(),
  accessories: z.string().trim().optional(),
  note: z.string().trim().optional(),
  status: z.nativeEnum(OrderStatus).optional(),
  shop_id: z
    .string()
    .trim()
    .uuid()
    .optional()
    .superRefine(async (value, ctx) =>
      isExists<Shop>({ model: Shop, field: 'id', value, ctx }),
    ),
});

export class UpdateOrderDto extends CreateZodDto(UpdateOrderSchema) {}
