import { Injectable } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';
import { DateTime } from 'luxon';

import { EditClientDto, StoreClientDto } from '@client/dto';
import { PaginationOptions } from '@common/interfaces/pagination.interface';
import { ClientRepository } from '@client/repositories/client.repository';
import { RoleRepository } from '@role/repositories/role.repository';
import { UserRepository } from '@user/repositories/user.repository';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  public async list({
    page,
    per_page,
    search,
    sort,
    direction,
  }: PaginationOptions) {
    return this.clientRepository.paginate({
      page,
      per_page,
      search,
      sort,
      direction,
    });
  }

  public async get(id: string) {
    return this.clientRepository.get(id);
  }

  public async store({ user, ...data }: StoreClientDto) {
    const clientRole = await this.roleRepository.findOneOrFail({
      name: 'client',
    });

    return this.clientRepository.store({
      user: {
        ...user,
        roles: [clientRole],
      },
      ...data,
    });
  }

  public async save(id: string, { user: userData, ...data }: EditClientDto) {
    const client = await this.clientRepository.save(id, data);
    const user = await this.userRepository.save(client.user.id, userData);

    wrap(client).assign(data);
    wrap(user).assign(user);

    await this.clientRepository.flush();

    return client;
  }

  public async delete(id: string) {
    const client = await this.clientRepository.get(id);
    wrap(client).assign({
      deleted_at: DateTime.local(),
    });
    await this.clientRepository.flush();
  }
}
