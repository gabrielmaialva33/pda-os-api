import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

export const MultipleFilesSchema = z.object({
  files: z.array(z.any()).nonempty(),
});

export class MultipleFilesDto extends CreateZodDto(MultipleFilesSchema) {}
