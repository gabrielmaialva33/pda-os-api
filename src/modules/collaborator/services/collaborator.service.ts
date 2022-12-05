import { Injectable } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';
import { DateTime } from 'luxon';

import { EditCollaboratorDto, StoreCollaboratorDto } from '@collaborator/dto';
import { CollaboratorRepository } from '@collaborator/repositories/collaborator.repository';
import { PaginationOptions } from '@common/interfaces/pagination.interface';

@Injectable()
export class CollaboratorService {
  constructor(
    private readonly collaboratorRepository: CollaboratorRepository,
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

  async store(data: StoreCollaboratorDto) {
    return this.collaboratorRepository.store(data);
  }

  async save(id: string, { user, ...data }: EditCollaboratorDto) {
    const collaboratorEntity = await this.collaboratorRepository.save(id, data);
    const userEntity = collaboratorEntity.user;

    wrap(collaboratorEntity).assign(data);
    wrap(userEntity).assign(user);

    return collaboratorEntity;
  }

  async delete(id: string) {
    const collaborator = await this.collaboratorRepository.get(id);
    wrap(collaborator).assign({
      deleted_at: DateTime.local(),
    });
    await this.collaboratorRepository.flush();
  }
}
