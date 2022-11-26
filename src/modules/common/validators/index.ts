import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export class ExistsConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [entity] = args.constraints;
    const [property] = args.property.split('.');
    console.log('args', args);
    return true;
  }
}

export const Exists = (
  table: string,
  validationOptions?: ValidationOptions,
) => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [table],
      validator: ExistsConstraint,
    });
  };
};
