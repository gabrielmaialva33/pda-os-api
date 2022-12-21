import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

export const CreateScheduleSchema = z.object({});

export class CreateScheduleDto extends CreateZodDto(CreateScheduleSchema) {}
