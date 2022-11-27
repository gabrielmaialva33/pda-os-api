import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';

export const ValidationPipeConfig = {
  transform: true,
  whitelist: true,
  validateCustomDecorators: true,
} as ValidationPipeOptions;
