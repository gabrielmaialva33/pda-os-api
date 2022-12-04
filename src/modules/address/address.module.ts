import { Module } from '@nestjs/common';

import { AddressController } from '@address/http/address.controller';
import { AddressService } from '@address/services/address.service';
import { OrmModule } from '@src/lib/orm/orm.module';

@Module({
  imports: [OrmModule],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
