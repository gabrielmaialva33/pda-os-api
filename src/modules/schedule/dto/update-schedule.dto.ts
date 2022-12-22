import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';
import { isExists } from '@lib/zod/refine.zod';

import { RoleCollaborator } from '@modules/schedule/enum/role-collaborator.enum';
import { ScheduleStatus } from '@modules/schedule/enum/schedule-status.enum';
import { Shop } from '@modules/shop/entities/shop.entity';
import { DateTime } from 'luxon';

export const UpdateScheduleSchema = z.object({
  date: z
    .string()
    .trim()
    .datetime()
    .transform((value) => DateTime.fromISO(value).toISODate())
    .optional(),
  start_time: z
    .string()
    .trim()
    .datetime()
    .transform((value) => DateTime.fromISO(value).toFormat('HH:mm:ss'))
    .optional(),
  end_time: z
    .string()
    .trim()
    .datetime()
    .transform((value) => DateTime.fromISO(value).toFormat('HH:mm:ss'))
    .optional(),
  note: z.string().trim().optional(),
  status: z.nativeEnum(ScheduleStatus).optional(),
  shop_id: z
    .string()
    .trim()
    .uuid()
    .superRefine(async (value, ctx) =>
      isExists<Shop>({ model: Shop, field: 'id', value, ctx }),
    )
    .optional(),
  collaborators: z.array(
    z
      .object({
        id: z.string().trim().uuid(),
        role: z.nativeEnum(RoleCollaborator),
      })
      .optional(),
  ),
});

export class UpdateScheduleDto extends CreateZodDto(UpdateScheduleSchema) {}
