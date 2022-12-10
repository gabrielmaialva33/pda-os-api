import { ValidationArguments as BaseValidationArguments } from 'class-validator/types/validation/ValidationArguments';

export interface ValidationArguments<
  Constraints extends unknown[] = [],
  Object_ extends object = object,
> extends BaseValidationArguments {
  object: Object_;
  constraints: Constraints;
}
