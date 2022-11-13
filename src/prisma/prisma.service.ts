import { INestApplication as App, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserEntity } from '@user/entities/user.entity';
import { PrismaModule } from '@prisma/prisma.module';

@Injectable()
export class PrismaService extends PrismaClient {
  paginate = PrismaModule.paginator({ page: 1, perPage: 10 });

  constructor() {
    super({
      log: [
        {
          emit: 'stdout',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
      ],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();

    this.$use(PrismaModule.filterDeletedRecords);

    this.$use(UserEntity.hashPassword);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: App) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
