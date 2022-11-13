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
    if (Object.values(PrismaGetActions).includes(params.action)) {
      params.args.where = {
        is_deleted: false,
        ...params.args.where,
      };
    }

    return next(params);
  }
}

export const PrismaGetActions: Array<string> = [
  'findUnique',
  'findMany',
  'findFirst',
  'aggregate',
  'count',
  'findRaw',
];
