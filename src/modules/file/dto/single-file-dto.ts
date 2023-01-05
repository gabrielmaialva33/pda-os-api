import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

export const SingleFileSchema = z.object({
  file: z.any(),
});

export class SingleFileDto extends CreateZodDto(SingleFileSchema) {}
