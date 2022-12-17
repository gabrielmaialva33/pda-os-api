import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

export const CreateAddressSchema = z.object({
  street: z.string().min(1).max(100),
  number: z.string().min(1).max(10).optional(),
  complement: z.string().min(1).max(100).optional(),
  neighborhood: z.string().min(1).max(100),
  city: z.string().min(1).max(100),
  state: z.string().min(2).max(2),
  zip_code: z.string().min(1).max(10),
});

export class CreateAddressDto extends CreateZodDto(CreateAddressSchema) {}
