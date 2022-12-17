import { ZodIssueCode } from 'zod';
import { isUUID } from 'class-validator';
import { Model, ModelClass, ModelProps } from 'objection';

import { RefinementCtx } from 'zod/lib/types';

interface IArgs<T extends Model> {
  model: ModelClass<T>;
  field: ModelProps<T>;
  value: any;
  ctx?: RefinementCtx;
}

export const isUnique = async <T extends Model>({
  model,
  field,
  value,
  ctx,
}: IArgs<T>): Promise<boolean> => {
  // check if value is unique
  const count = await model
    .query()
    .where({ [field]: value })
    .resultSize();
  if (count > 0) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: `${model.name} already exists`,
      params: {
        value,
      },
    });
    return false;
  }
};

export const isExists = async <T extends Model>({
  model,
  field,
  value,
  ctx,
}: IArgs<T>) => {
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (!isUUID(value[i], 4)) return false;

      const count = await model
        .query()
        .where({ [field]: value[i] })
        .resultSize();

      if (count === 0) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: `${model.name} does not exist`,
          params: {
            value: value[i],
          },
          path: [i],
        });
        return false;
      }
    }
  } else {
    if (!isUUID(value, 4)) return false;

    const count = await model
      .query()
      .where({ [field]: value })
      .resultSize();

    if (count === 0) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: `${model.name} does not exist`,
        params: {
          value,
        },
      });
      return false;
    }
  }

  return true;
};
