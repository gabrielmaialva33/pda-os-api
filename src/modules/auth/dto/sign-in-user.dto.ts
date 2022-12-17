import { z } from '@lib/zod/z';
import { CreateZodDto } from '@lib/zod';

export const SignInUserSchema = z.object({
  uid: z.string().trim(),
  password: z.string().trim(),
});

export class SignInUserDto extends CreateZodDto(SignInUserSchema) {}
