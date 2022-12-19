import { z } from '@lib/zod/z';

import { CreateZodDto } from '@lib/zod';

import { CreatePhoneSchema } from '@modules/phone/dto';
import { CreateAddressSchema } from '@modules/address/dto';

export const CreateClientSchema = z.object({
  full_name: z.string().min(3).max(255),
  cpf: z.string().trim(),
  rg: z.string().trim(),
  birth_date: z.string().trim(),
  phones: z.array(CreatePhoneSchema).optional(),
  addresses: z.array(CreateAddressSchema).optional(),
});

export class CreateClientDto extends CreateZodDto(CreateClientSchema) {}
