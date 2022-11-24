import { Injectable } from '@nestjs/common';
import { EditUserDto, StoreUserDto } from '@user/dto';
import { UserRepository } from '@user/repositories/user.repository';
import { PaginationOptions } from '@common/interfaces/pagination.interface';
import { DateTime } from 'luxon';
import { wrap } from '@mikro-orm/core';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async list({ page, per_page, search, sort, direction }: PaginationOptions) {
    return this.userRepository.paginate({
      page,
      per_page,
      search,
      sort,
      direction,
    });
  }

  async get(id: string) {
    return this.userRepository.findOne(id);
  }

  async create(data: StoreUserDto) {
    const user = await this.userRepository.create(data);
    await this.userRepository.persistAndFlush(user);
    return user;
  }

  async update(id: string, data: EditUserDto) {
    const user = await this.userRepository.findOne({
      id,
    });

    wrap(user).assign(data);
    await this.userRepository.flush();

    return user;
  }

  async delete(id: string) {
    const user = await this.userRepository.findOneOrFail(id);
    user.deleted_at = DateTime.local();
    return this.userRepository.upsert(user);
  }
}
