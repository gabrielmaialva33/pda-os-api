import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

import { CreatePhoneSchema } from '@modules/phone/dto';
import { CreateAddressSchema } from '@modules/address/dto';

export const UpdateClientSchema = z.object({
  cpf: z.string().trim(),
  rg: z.string().trim(),
  birth_date: z.string().trim(),
  phones: z.array(CreatePhoneSchema).optional(),
  addresses: z.array(CreateAddressSchema).optional(),
});

export class UpdateClientDto extends CreateZodDto(UpdateClientSchema) {}
