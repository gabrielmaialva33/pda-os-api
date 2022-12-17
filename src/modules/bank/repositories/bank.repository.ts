import { BaseRepository } from '@common/repositories/base.repository';
import { Bank } from '@modules/bank/entities/bank.entity';

export class BankRepository extends BaseRepository<Bank> {
  constructor() {
    super(Bank);
  }
}
