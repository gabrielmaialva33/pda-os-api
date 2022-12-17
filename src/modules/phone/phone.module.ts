import { Module } from '@nestjs/common';
import { OrmModule } from '@lib/orm/orm.module';

import { PhoneController } from '@modules/phone/controllers/phone.controller';
import { PhoneService } from '@modules/phone/services/phone.service';
import { PhoneRepository } from '@modules/phone/repositories/phone.repository';

@Module({
  imports: [OrmModule],
  controllers: [PhoneController],
  providers: [PhoneService, PhoneRepository],
  exports: [PhoneService],
})
export class PhoneModule {}
