import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';
import { isUnique } from '@lib/zod/refine.zod';

import { User } from '@modules/user/entities/user.entity';
import { RoleType } from '@modules/role/enum/role-type.enum';

export const UpdateUserSchema = z.object({
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
  role: z.nativeEnum(RoleType),
});

export class UpdateUserDto extends CreateZodDto(UpdateUserSchema) {}
