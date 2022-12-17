import { BaseRepository } from '@common/repositories/base.repository';
import { Phone } from '@modules/phone/entities/phone.entity';

export class PhoneRepository extends BaseRepository<Phone> {
  constructor() {
    super(Phone);
  }
}
