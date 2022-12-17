import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

export const CreateBankSchema = z.object({
  name: z.string().trim().min(3).max(100),
  agency: z.string().trim().min(3).max(100),
  account: z.string().trim().min(3).max(100),
  pix: z.string().trim().min(3).max(100),
  collaborator_id: z.string().uuid().optional(),
});

export class CreateBankDto extends CreateZodDto(CreateBankSchema) {}
