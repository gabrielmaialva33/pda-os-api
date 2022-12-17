import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

export const UpdateBankSchema = z.object({
  name: z.string().trim().min(3).max(100).optional(),
  agency: z.string().trim().min(3).max(100).optional(),
  account: z.string().trim().min(3).max(100).optional(),
  pix: z.string().trim().min(3).max(100).optional(),
});

export class UpdateBankDto extends CreateZodDto(UpdateBankSchema) {}
