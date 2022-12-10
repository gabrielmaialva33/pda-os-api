import { EntityManager } from '@mikro-orm/core';
import { Type } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { ValidationArguments } from '@common/interfaces/validation-arguments.interface';

type IsExistsValidationContext = ValidationArguments<
  Parameters<typeof IsExists>
>;

export const IsExists =
  <Entity>(
    entityType: () => Type<Entity>,
    field: keyof Entity,
    options?: ValidationOptions,
  ) =>
  ({ constructor: target }: object, propertyName: string): void =>
    registerDecorator({
      constraints: [entityType, field],
      target,
      options,
      propertyName,
      validator: IsExistsConstraint,
      name: 'isExists',
      async: true,
    });

@ValidatorConstraint({ async: true })
export class IsExistsConstraint implements ValidatorConstraintInterface {
  constructor(private em: EntityManager) {}

  async validate<Entity, Field extends keyof Entity>(
    value: Entity[Field],
    context: IsExistsValidationContext,
  ): Promise<boolean> {
    const [entityType, field] = context.constraints;
    const result = await this.em.find(entityType(), { [field]: value });
    return result.length > 0;
  }

  defaultMessage(context: IsExistsValidationContext): string {
    return `${context.property} is not exists`;
  }
}
