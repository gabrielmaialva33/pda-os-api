import { Injectable } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';
import { DateTime } from 'luxon';

import { EditPhoneDto, StorePhoneDto } from '@phone/dto';
import { PaginationOptions } from '@common/interfaces/pagination.interface';
import { PhoneRepository } from '@phone/repositories/phone.repository';

@Injectable()
export class PhoneService {
  constructor(private readonly phoneRepository: PhoneRepository) {}

  async list({ page, per_page, search, sort, direction }: PaginationOptions) {
    return this.phoneRepository.paginate({
      page,
      per_page,
      search,
      sort,
      direction,
    });
  }

  async get(id: string) {
    return this.phoneRepository.get(id);
  }

  async store(data: StorePhoneDto) {
    return this.phoneRepository.store(data);
  }

  async save(id: string, data: EditPhoneDto) {
    return this.phoneRepository.save(id, data);
  }

  async delete(id: string) {
    const phone = await this.phoneRepository.get(id);
    wrap(phone).assign({
      deleted_at: DateTime.local(),
    });
    await this.phoneRepository.flush();
  }
}
