import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';
import { isExists } from '@lib/zod/refine.zod';
import { DateTime } from 'luxon';

import { RoleCollaborator } from '@modules/schedule/enum/role-collaborator.enum';
import { ScheduleStatus } from '@modules/schedule/enum/schedule-status.enum';
import { Shop } from '@modules/shop/entities/shop.entity';

export const CreateScheduleSchema = z.object({
  date: z
    .string()
    .trim()
    .datetime({ offset: true })
    .transform((value) => DateTime.fromISO(value).toISODate()),
  start_time: z
    .string()
    .trim()
    .datetime({ offset: true })
    .transform((value) => DateTime.fromISO(value).toFormat('HH:mm:ss')),
  end_time: z
    .string()
    .trim()
    .datetime({ offset: true })
    .transform((value) => DateTime.fromISO(value).toFormat('HH:mm:ss')),
  note: z.string().trim().optional(),
  status: z.nativeEnum(ScheduleStatus).optional(),
  collaborators: z.array(
    z.object({
      id: z.string().trim().uuid(),
      role: z.nativeEnum(RoleCollaborator),
    }),
  ),
});

export class CreateScheduleDto extends CreateZodDto(CreateScheduleSchema) {}
