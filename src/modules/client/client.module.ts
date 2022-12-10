import { Module } from '@nestjs/common';

import { OrmModule } from '@src/lib/orm/orm.module';
import { ClientController } from '@client/http/client.controller';
import { ClientService } from '@client/services/client.service';

@Module({
  imports: [OrmModule],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
