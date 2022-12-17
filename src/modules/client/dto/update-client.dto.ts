import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

export const UpdateClientSchema = z.object({
  cpf: z.string().trim(),
  rg: z.string().trim(),
  birth_date: z.string().trim(),
});

export class UpdateClientDto extends CreateZodDto(UpdateClientSchema) {}
