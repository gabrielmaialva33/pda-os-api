import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

export const MultipleFilesSchema = z.object({
  file: z.any(),
});

export class MultipleFilesDto extends CreateZodDto(MultipleFilesSchema) {}
