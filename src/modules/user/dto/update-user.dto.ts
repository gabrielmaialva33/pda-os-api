import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';
import { isExists, isUnique } from '@lib/zod/refine.zod';

import { User } from '@modules/user/entities/user.entity';
import { Role } from '@modules/role/entities/role.entity';

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
  roles: z
    .array(z.string().trim().uuid())
    .superRefine((value, ctx) =>
      isExists<Role>({ model: Role, field: 'id', value, ctx }),
    ),
});

export class UpdateUserDto extends CreateZodDto(UpdateUserSchema) {}
