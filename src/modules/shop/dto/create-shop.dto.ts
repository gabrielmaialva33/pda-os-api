import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';
import { isExists } from '@lib/zod/refine.zod';

import { Client } from '@modules/client/entities/client.entity';

export const CreateShopSchema = z.object({
  name: z.string().trim(),
  type: z.string().trim(),
  cost: z.number(),
  profit: z.number(),
  percentage_profit: z.number(),
  net_profit: z.number(),
  sale_price: z.number(),
  commission: z.number(),
  send_sms: z.boolean(),
  forecast_return: z.number(),
  status: z.string().trim(),
  client_id: z
    .string()
    .uuid()
    .superRefine(async (value, ctx) =>
      isExists<Client>({ model: Client, field: 'id', value, ctx }),
    ),
});

export class CreateShopDto extends CreateZodDto(CreateShopSchema) {}
