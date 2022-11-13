import { Module } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Prisma, PrismaClient } from '@prisma/client';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */
  static filterDeletedRecords(params: Prisma.MiddlewareParams, next) {
    if (Object.values(PrismaGetActions).includes(params.action)) {
      params.args.where = {
        is_deleted: false,
        ...params.args.where,
      };
    }

    return next(params);
  }

  /**
   * ------------------------------------------------------
   * Misc
   * ------------------------------------------------------
   */
  static paginator = (defaultOptions: PaginateOptions): PaginateFunction => {
    return async (model: any, options, args: any) => {
      const page = Number(options?.page || defaultOptions?.page) || 1;
      const perPage = Number(options?.perPage || defaultOptions?.perPage) || 10;
      const sort = options?.sort || defaultOptions?.sort || 'created_at';
      const direction =
        options?.direction || defaultOptions?.direction || 'desc';
      const searchFields =
        options?.searchFields || defaultOptions?.searchFields || [];
      const search = options?.search || defaultOptions?.search || null;

      for (const field of searchFields)
        if (search)
          args.where = {
            ...args.where,
            [field]: {
              contains: search,
              mode: 'insensitive',
            },
          };

      const skip = page > 0 ? perPage * (page - 1) : 0;
      const [total, data] = await Promise.all([
        model.count({ where: args.where }),
        model.findMany({
          ...args,
          take: perPage,
          skip,
          orderBy: {
            [sort]: direction,
          },
        }),
      ]);
      const lastPage = Math.ceil(total / perPage);

      return {
        data,
        meta: {
          total,
          last_page: lastPage,
          current_page: page,
          per_page: perPage,
          prev: page > 1 ? page - 1 : null,
          next: page < lastPage ? page + 1 : null,
        },
      };
    };
  };
}

export const PrismaGetActions: Array<string> = [
  'findUnique',
  'findMany',
  'findFirst',
  'aggregate',
  'count',
  'findRaw',
];

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    last_page: number;
    current_page: number;
    per_page: number;
    prev: number | null;
    next: number | null;
  };
}

export type PaginateOptions = {
  page?: number | string;
  perPage?: number | string;
  sort?: string;
  direction?: 'asc' | 'desc';
  search?: string;
  searchFields?: string[];
};
export type PaginateFunction = <T, K>(
  model: any,
  options?: PaginateOptions,
  args?: K,
) => Promise<PaginatedResult<T>>;
