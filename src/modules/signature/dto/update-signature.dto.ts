import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

export const UpdateSignatureSchema = z.object({
  full_name: z.string().min(1).max(160).optional(),
  rubric: z.string().min(1).max(20).optional(),
  image_url: z.string().min(1).max(255).optional(),
});

export class UpdateSignatureDto extends CreateZodDto(UpdateSignatureSchema) {}
