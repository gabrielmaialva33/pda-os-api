import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';
import { isExists, isUnique } from '@lib/zod/refine.zod';

import { User } from '@modules/user/entities/user.entity';
import { Role } from '@modules/role/entities/role.entity';

export const CreateUserSchema = z.object({
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
  password: z.password().min(6).max(30),
  avatar: z.string().min(1).max(255).optional(),
  roles: z
    .array(z.string().uuid().trim())
    .superRefine((value, ctx) =>
      isExists<Role>({ model: Role, field: 'id', value, ctx }),
    ),
});

export class CreateUserDto extends CreateZodDto(CreateUserSchema) {}
