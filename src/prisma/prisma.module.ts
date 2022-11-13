import { Module } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Prisma } from '@prisma/client';

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
    if (Object.values(PrismaActions).includes(params.action)) {
      params.args.where = {
        is_deleted: false,
        ...params.args.where,
      };
    }

    return next(params);
  }
}

export type PrismaAction =
  | 'findUnique'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'createMany'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'
  | 'count'
  | 'runCommandRaw'
  | 'findRaw';

export const PrismaActions: PrismaAction[] = [
  'findUnique',
  'findMany',
  'findFirst',
  'create',
  'createMany',
  'update',
  'updateMany',
  'upsert',
  'delete',
  'deleteMany',
  'executeRaw',
  'queryRaw',
  'aggregate',
  'count',
  'runCommandRaw',
  'findRaw',
];
