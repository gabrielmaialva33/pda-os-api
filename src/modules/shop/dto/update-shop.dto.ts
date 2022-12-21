import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

export const UpdateShopSchema = z.object({
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
});

export class UpdateShopDto extends CreateZodDto(UpdateShopSchema) {}
