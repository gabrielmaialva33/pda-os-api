import { Module } from '@nestjs/common';
import { OrmModule } from '@lib/orm/orm.module';

import { AddressController } from '@modules/address/controllers/address.controller';
import { AddressService } from '@modules/address/services/address.service';
import { AddressRepository } from '@modules/address/repositories/address.repository';

@Module({
  imports: [OrmModule],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository],
  exports: [AddressService],
})
export class AddressModule {}
