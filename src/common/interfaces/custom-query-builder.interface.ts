import { FetchGraphOptions, PartialModelObject } from 'objection';
import { BaseEntity } from '@common/entities/base.entity';

export type GenericFunction = (...args: any[]) => any;
export type GenericClass = Record<string, any>;
export type ModelKeys<T extends BaseEntity> = PartialModelObject<T> & {
  [key: string]: any;
};

export interface ObjectionModel {
  $fetchGraph?: GenericFunction;

  $load?(exp: LoadRelSchema): Promise<void>;
}

export interface NestedLoadRelSchema {
  $recursive?: boolean | number;
  $relation?: string;
  $modify?: string[];

  [key: string]:
    | boolean
    | number
    | string
    | string[]
    | NestedLoadRelSchema
    | undefined;
}

export interface LoadRelSchema {
  [key: string]: boolean | NestedLoadRelSchema;
}

export type LoadRelOptions = FetchGraphOptions;
