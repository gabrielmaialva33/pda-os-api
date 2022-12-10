import { Injectable, NotFoundException } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';
import { DateTime } from 'luxon';
import { from, map, Observable, switchMap } from 'rxjs';
import { I18nService } from 'nestjs-i18n';

import { EditCollaboratorDto, StoreCollaboratorDto } from '@collaborator/dto';
import {
  Pagination,
  PaginationOptions,
} from '@common/interfaces/pagination.interface';
import { CollaboratorRepository } from '@collaborator/repositories/collaborator.repository';
import { RoleRepository } from '@role/repositories/role.repository';
import { UserRepository } from '@user/repositories/user.repository';
import { CollaboratorEntity } from '@collaborator/entities/collaborator.entity';

@Injectable()
export class CollaboratorService {
  constructor(
    private readonly collaboratorRepository: CollaboratorRepository,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly i18nService: I18nService,
  ) {}

  list({
    page,
    per_page,
    search,
    sort,
    direction,
  }: PaginationOptions): Observable<Pagination<CollaboratorEntity>> {
    return from(
      this.collaboratorRepository.paginate({
        page,
        per_page,
        search,
        sort,
        direction,
      }),
    );
  }

  get(id: string): Observable<CollaboratorEntity> {
    return from(this.collaboratorRepository.get(id)).pipe(
      map((collaborator) => {
        if (!collaborator)
          throw new NotFoundException(
            this.i18nService.translate('exception.not_found', {
              args: [this.i18nService.translate('common.collaborator')],
            }),
          );

        return collaborator;
      }),
    );
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

  save(id: string, data: EditCollaboratorDto) {
    return this.get(id).pipe(
      switchMap((collaborator) => {
        wrap(collaborator).assign(data);
        return from(this.collaboratorRepository.flush());
      }),
    );
  }

  async delete(id: string) {
    const collaborator = await this.collaboratorRepository.get(id);
    wrap(collaborator).assign({
      deleted_at: DateTime.local(),
    });
    await this.collaboratorRepository.flush();
  }
}
