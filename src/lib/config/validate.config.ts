import { z } from 'zod';
import { Logger } from '@nestjs/common';

export const ValidateSchema = z.object({
  HOST: z.string().trim().default('localhost'),
  PORT: z
    .string()
    .trim()
    .min(1)
    .default('3333')
    .transform((value) => Number(value)),
  SECRET_KEY: z.string().trim().min(1).default('secret'),
  ACCESS_EXPIRY: z.string().trim().min(1).default('1h'),
  REFRESH_EXPIRY: z.string().trim().min(1).default('1d'),
  DATABASE_URL: z.string().trim().optional(),
  PG_HOST: z.string().trim().min(1).default('localhost'),
  PG_PORT: z
    .string()
    .trim()
    .min(1)
    .default('5432')
    .transform((value) => Number(value)),
  PG_USER: z.string().trim().min(1).default('postgres'),
  PG_PASSWORD: z.string().trim().min(1).default('postgres'),
  PG_DB: z.string().trim().min(1),
  PG_DEBUG: z
    .string()
    .trim()
    .min(1)
    .optional()
    .default('false')
    .transform((value) => Boolean(value)),
  PG_SSL: z
    .string()
    .trim()
    .min(1)
    .optional()
    .transform((value) => value === 'true'),
});

export function validateEnv(config: Record<string, unknown>) {
  const errors: any = ValidateSchema.safeParse(config);
  if (!errors.success) {
    for (const { message, path } of errors.error.issues)
      Logger.error(message, path.join('.'));

    throw new Error('Invalid environment config.');
  }

  return errors as typeof config;
}
