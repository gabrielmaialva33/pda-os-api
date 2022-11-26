import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { Injectable } from '@nestjs/common';
import { AnyEntity, EntityManager } from '@mikro-orm/core';

@ValidatorConstraint({ name: 'Unique', async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly em: EntityManager) {}

  public async validate(value: any, args: ValidationArguments) {
    const model = args.constraints[0];
    if (!model) throw new Error('Model argument is missing');
    const [property] = args.property.split('.');
    const entity = await this.em.findOne(model, {
      [property]: value,
    });

    console.log('entity', entity);
    return false;
  }
}

export const Unique = (
  model: AnyEntity,
  validationOptions?: ValidationOptions,
) => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model],
      validator: UniqueConstraint,
    });
  };
};
