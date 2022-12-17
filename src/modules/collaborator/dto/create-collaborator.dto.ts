import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

import { isUnique } from '@lib/zod/refine.zod';
import { User } from '@modules/user/entities/user.entity';
import { CreatePhoneSchema } from '@modules/phone/dto';
import { CreateAddressSchema } from '@modules/address/dto';
import { CreateBankDto, CreateBankSchema } from '@modules/bank/dto';

const CreateCollaboratorSchema = z.object({
  cpf: z.string().trim(),
  rg: z.string().trim(),
  birth_date: z.string().trim(),
  job: z.string().trim(),
  sex: z.string().trim(),
  work_type: z.string().trim(),
  status: z.string().trim(),
  civil_status: z.string().trim(),
  note: z.string().trim(),
  phones: z.array(CreatePhoneSchema).optional(),
  addresses: z.array(CreateAddressSchema).optional(),
  bank: CreateBankSchema,
  user: z.object({
    first_name: z.string().min(1).max(80),
    last_name: z.string().min(1).max(80),
    email: z
      .string()
      .min(1)
      .max(255)
      .superRefine(async (value, ctx) =>
        isUnique<User>({ model: User, field: 'email', value, ctx }),
      ),
    user_name: z
      .string()
      .min(1)
      .max(50)
      .superRefine(async (value, ctx) =>
        isUnique<User>({ model: User, field: 'user_name', value, ctx }),
      ),
    password: z.string().min(1).max(118),
    avatar: z.string().min(1).max(255).optional(),
  }),
});

export class CreateCollaboratorDto extends CreateZodDto(
  CreateCollaboratorSchema,
) {}
