import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

import { PhoneType } from '@modules/phone/enum/phone-type.enum';

export const UpdatePhoneSchema = z.object({
  phone: z.string().trim().min(1).max(20).optional(),
  type: z.nativeEnum(PhoneType).optional(),
});

export class UpdatePhoneDto extends CreateZodDto(UpdatePhoneSchema) {}
