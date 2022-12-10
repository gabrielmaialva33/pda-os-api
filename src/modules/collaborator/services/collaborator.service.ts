import { Injectable } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';
import { DateTime } from 'luxon';

import { EditCollaboratorDto, StoreCollaboratorDto } from '@collaborator/dto';
import { CollaboratorRepository } from '@collaborator/repositories/collaborator.repository';
import { PaginationOptions } from '@common/interfaces/pagination.interface';
import { RoleRepository } from '@role/repositories/role.repository';

@Injectable()
export class CollaboratorService {
  constructor(
    private readonly collaboratorRepository: CollaboratorRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async list({ page, per_page, search, sort, direction }: PaginationOptions) {
    return this.collaboratorRepository.paginate({
      page,
      per_page,
      search,
      sort,
      direction,
    });
  }

  async get(id: string) {
    return this.collaboratorRepository.get(id);
  }

  async store({ user: userData, ...data }: StoreCollaboratorDto) {
    const collaboratorRole = await this.roleRepository.findOneOrFail({
      name: 'collaborator',
    });

    return this.collaboratorRepository.store({
      user: {
        ...userData,
        roles: [collaboratorRole],
      },
      ...data,
    });
  }

  async save(id: string, { user: userData, ...data }: EditCollaboratorDto) {
    const collaborator = await this.collaboratorRepository.save(id, data);
    const user = collaborator.user;

    wrap(collaborator).assign(data);
    wrap(user).assign(userData);

    return collaborator;
  }

  async delete(id: string) {
    const collaborator = await this.collaboratorRepository.get(id);
    wrap(collaborator).assign({
      deleted_at: DateTime.local(),
    });
    await this.collaboratorRepository.flush();
  }
}
