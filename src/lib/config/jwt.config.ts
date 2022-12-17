import { registerAs } from '@nestjs/config';
import { ValidateSchema } from '@lib/config/validate.config';

const environment = ValidateSchema.parse(process.env);

export const jwt = registerAs('jwt', () => ({
  secret: environment.SECRET_KEY,
  access_expiry: environment.ACCESS_EXPIRY,
  refresh_expiry: environment.REFRESH_EXPIRY,
}));
