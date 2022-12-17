import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

import { PhoneType } from '@modules/phone/enum/phone-type.enum';

export const CreatePhoneSchema = z.object({
  phone: z.string().trim().min(1).max(20),
  type: z.nativeEnum(PhoneType),
});

export class CreatePhoneDto extends CreateZodDto(CreatePhoneSchema) {}
