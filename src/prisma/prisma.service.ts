import { INestApplication as App, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserEntity } from '@user/entities/user.entity';
import { PrismaModule } from '@prisma/prisma.module';

@Injectable()
export class PrismaService extends PrismaClient {
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
