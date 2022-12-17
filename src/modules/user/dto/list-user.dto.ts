import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

import { User } from '@modules/user/entities/user.entity';

const sorts = [...Object.keys(User.jsonSchema.properties)] as const;

export const ListUserSchema = z.object({
  page: z
    .string()
    .trim()
    .optional()
    .transform((v) => parseInt(v, 10)),
  per_page: z
    .string()
    .trim()
    .optional()
    .transform((v) => parseInt(v, 10)),
  search: z.string().trim().optional(),
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
