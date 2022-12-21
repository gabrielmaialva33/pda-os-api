import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

export const UpdateScheduleSchema = z.object({});

export class UpdateScheduleDto extends CreateZodDto(UpdateScheduleSchema) {}
