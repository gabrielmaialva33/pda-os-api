import { Module } from '@nestjs/common';
import { OrmModule } from '@lib/orm/orm.module';

import { BankController } from '@modules/bank/controllers/bank.controller';
import { BankService } from '@modules/bank/services/bank.service';
import { BankRepository } from '@modules/bank/repositories/bank.repository';

@Module({
  imports: [OrmModule],
  controllers: [BankController],
  providers: [BankService, BankRepository],
  exports: [BankService],
})
export class BankModule {}
