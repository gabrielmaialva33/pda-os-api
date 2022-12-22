import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

import { RoleCollaborator } from '@modules/schedule/enum/role-collaborator.enum';
import { ScheduleStatus } from '@modules/schedule/enum/schedule-status.enum';
import { isExists } from '@lib/zod/refine.zod';
import { Schedule } from '@modules/schedule/entities/schedule.entity';

export const UpdateScheduleSchema = z.object({
  date: z.string().trim().datetime().optional(),
  start_time: z.string().trim().datetime().optional(),
  end_time: z.string().trim().datetime().optional(),
  note: z.string().trim().optional(),
  status: z.nativeEnum(ScheduleStatus).optional(),
  shop_id: z
    .string()
    .trim()
    .uuid()
    .superRefine(async (value, ctx) =>
      isExists<Schedule>({ model: Schedule, field: 'id', value, ctx }),
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
