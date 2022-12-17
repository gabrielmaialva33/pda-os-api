import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

export const UpdateAddressSchema = z.object({
  street: z.string().min(1).max(100).optional(),
  number: z.string().min(1).max(10).optional(),
  complement: z.string().min(1).max(100).optional(),
  neighborhood: z.string().min(1).max(100).optional(),
  city: z.string().min(1).max(100).optional(),
  state: z.string().min(2).max(2).optional(),
  zip_code: z.string().min(1).max(10).optional(),
});

export class UpdateAddressDto extends CreateZodDto(UpdateAddressSchema) {}
