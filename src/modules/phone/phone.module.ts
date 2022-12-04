import { Module } from '@nestjs/common';
import { PhoneController } from '@phone/http/phone.controller';
import { PhoneService } from '@phone/services/phone.service';
import { OrmModule } from '@src/lib/orm/orm.module';

@Module({
  imports: [OrmModule],
  controllers: [PhoneController],
  exports: [PhoneService],
  providers: [PhoneService],
})
export class PhoneModule {}
