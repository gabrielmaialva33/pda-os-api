import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';
import { CreatePhoneSchema } from '@modules/phone/dto';
import { CreateAddressSchema } from '@modules/address/dto';
import { CreateBankSchema } from '@modules/bank/dto';

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
});

export class UpdateCollaboratorDto extends CreateZodDto(
  UpdateCollaboratorSchema,
) {}
