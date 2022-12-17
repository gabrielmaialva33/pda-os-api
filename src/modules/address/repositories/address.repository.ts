import { BaseRepository } from '@common/repositories/base.repository';
import { Address } from '@modules/address/entities/address.entity';

export class AddressRepository extends BaseRepository<Address> {
  constructor() {
    super(Address);
  }
}
