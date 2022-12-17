import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

import { User } from '@modules/user/entities/user.entity';

const sorts = [...Object.keys(User.jsonSchema.properties)] as const;

export const ListUserSchema = z.object({
  sort: z
    .enum(sorts as any)
    .optional()
    .default('created_at'),
  order: z
    .enum(['asc', 'desc'] as const)
    .optional()
    .default('desc'),
});

export class ListUserDto extends CreateZodDto(ListUserSchema) {}
