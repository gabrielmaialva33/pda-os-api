import { Injectable } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';
import { DateTime } from 'luxon';

import { EditAddressDto, StoreAddressDto } from '@address/dto';
import { AddressRepository } from '@address/repositories/address.repository';
import { PaginationOptions } from '@common/interfaces/pagination.interface';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async list({ page, per_page, search, sort, direction }: PaginationOptions) {
    return this.addressRepository.paginate({
      page,
      per_page,
      search,
      sort,
      direction,
    });
  }

  async get(id: string) {
    return this.addressRepository.get(id);
  }

  async store(data: StoreAddressDto) {
    return this.addressRepository.store(data);
  }

  async save(id: string, data: EditAddressDto) {
    return this.addressRepository.save(id, data);
  }

  async delete(id: string) {
    const address = await this.addressRepository.get(id);
    wrap(address).assign({
      deleted_at: DateTime.local(),
    });
    await this.addressRepository.flush();
  }
}
