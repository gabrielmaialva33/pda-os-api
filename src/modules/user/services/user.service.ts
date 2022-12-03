import { Injectable } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';
import { DateTime } from 'luxon';

import { EditUserDto, StoreUserDto } from '@user/dto';
import { UserRepository } from '@user/repositories/user.repository';
import { PaginationOptions } from '@common/interfaces/pagination.interface';
import { RoleService } from '@role/services/role.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService,
  ) {}

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
    return this.userRepository.get(id);
  }

  async store({ roles, ...data }: StoreUserDto) {
    for (const role of roles) {
      await this.roleService.get(role.id);
    }

    const user = await this.userRepository.store(data);

    await this.userRepository.flush();
    return user;
  }

  async save(id: string, data: EditUserDto) {
    return this.userRepository.save(id, data);
  }

  async delete(id: string) {
    const model = await this.userRepository.get(id);
    wrap(model).assign({
      email: `${model.email}:deleted:${model.id.split('-')[0]}`,
      user_name: `${model.user_name}:deleted:${model.id.split('-')[0]}`,
      deleted_at: DateTime.local(),
    });
    await this.userRepository.flush();
  }

  async getBy(fields: string[], values: string[]) {
    return this.userRepository.getBy(fields, values);
  }
}
