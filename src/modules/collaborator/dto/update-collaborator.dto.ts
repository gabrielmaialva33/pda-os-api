import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';
import { CreatePhoneSchema } from '@modules/phone/dto';
import { CreateAddressSchema } from '@modules/address/dto';
import { CreateBankSchema } from '@modules/bank/dto';
import { isUnique } from '@lib/zod/refine.zod';
import { User } from '@modules/user/entities/user.entity';

const UpdateCollaboratorSchema = z.object({
  code: z.string().optional(),
  cpf: z.string().optional(),
  rg: z.string().optional(),
  birth_date: z.string().optional(),
  job: z.string().optional(),
  sex: z.string().optional(),
  work_type: z.string().optional(),
  status: z.string().optional(),
  civil_status: z.string().optional(),
  note: z.string().optional(),
  phones: z.array(CreatePhoneSchema).optional(),
  addresses: z.array(CreateAddressSchema).optional(),
  bank: CreateBankSchema,
  user: z.object({
    first_name: z.string().min(1).max(80).optional(),
    last_name: z.string().min(1).max(80).optional(),
    email: z
      .string()
      .min(1)
      .max(255)
      .superRefine(async (value, ctx) =>
        isUnique<User>({ model: User, field: 'email', value, ctx }),
      )
      .optional(),
    user_name: z
      .string()
      .min(1)
      .max(50)
      .superRefine(async (value, ctx) =>
        isUnique<User>({ model: User, field: 'user_name', value, ctx }),
      )
      .optional(),
    password: z.string().min(1).max(118).optional(),
    avatar: z.string().min(1).max(255).optional(),
  }),
});

export class UpdateCollaboratorDto extends CreateZodDto(
  UpdateCollaboratorSchema,
) {}
