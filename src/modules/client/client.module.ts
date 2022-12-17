import { Module } from '@nestjs/common';
import { OrmModule } from '@lib/orm/orm.module';

import { ClientController } from '@modules/client/controllers/client.controller';
import { ClientService } from '@modules/client/services/client.service';
import { ClientRepository } from '@modules/client/repositories/client.repository';
import { UserModule } from '@modules/user/user.module';
import { RoleModule } from '@modules/role/role.module';
import { PhoneModule } from '@modules/phone/phone.module';
import { AddressModule } from '@modules/address/address.module';

@Module({
  imports: [OrmModule, UserModule, RoleModule, PhoneModule, AddressModule],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
  exports: [ClientService],
})
export class ClientModule {}
