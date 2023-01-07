import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

export const CreateSignatureSchema = z.object({
  full_name: z.string().min(1).max(160),
  rubric: z.string().min(1).max(20),
  image_url: z.string().min(1).max(255),
});

export class CreateSignatureDto extends CreateZodDto(CreateSignatureSchema) {}
