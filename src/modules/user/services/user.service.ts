import { Injectable, NotFoundException } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';
import { DateTime } from 'luxon';
import { I18nService } from 'nestjs-i18n';

import { EditUserDto, StoreUserDto } from '@user/dto';
import { UserRepository } from '@user/repositories/user.repository';
import { PaginationOptions } from '@common/interfaces/pagination.interface';
import { RoleRepository } from '@role/repositories/role.repository';
import { RoleEntity } from '@role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly i18n: I18nService,
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

  async store({ roles, collaborator, ...data }: StoreUserDto) {
    const collection: RoleEntity[] = [];

    for (const id of roles) {
      const role = await this.roleRepository.get(id);
      if (!role) {
        throw new NotFoundException({
          message: this.i18n.t(`exception.not_found`, {
            args: [this.i18n.t(`exception.role`)],
          }),
          status: 401,
          display: true,
        });
      }
      collection.push(role);
    }

    return this.userRepository.store({
      ...data,
      roles: collection,
      collaborator: {
        ...collaborator,
      },
    });
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
