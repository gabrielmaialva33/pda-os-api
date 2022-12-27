import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { from, map, switchMap } from 'rxjs';
import { ModelProps } from 'objection';

import { PaginationObject } from '@lib/pagination';
import { ListOptions } from '@common/interfaces/base-repository.interface';
import { I18nTranslations } from '@/resources/i18n/generated/i18n.generated';

import { CreateRoleDto, UpdateRoleDto } from '@modules/role/dto';
import { RoleRepository } from '@modules/role/repositories/role.repository';
import { Role } from '@modules/role/entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

  paginate({ page, per_page, sort, order }: ListOptions<Role>) {
    return from(
      this.roleRepository.paginate({ page, per_page, sort, order }),
    ).pipe(
      map(({ total, results: data }) =>
        PaginationObject<Role>({
          data,
          total,
          page,
          per_page,
          route: '/roles',
        }),
      ),
    );
  }

  list({ sort, order }: ListOptions<Role>) {
    return from(this.roleRepository.list({ sort, order })).pipe(
      map((roles) => roles),
    );
  }

  get(id: string) {
    return from(this.roleRepository.getBy(['id'], id)).pipe(
      map((role) => {
        if (!role)
          throw new NotFoundException(
            this.i18nService.t('exception.not_found', {
              args: { entity: this.i18nService.t('model.role.entity') },
            }),
          );

        return role;
      }),
    );
  }

  getBy(field: ModelProps<Role>[], value: any) {
    return from(this.roleRepository.getBy(field, value)).pipe(
      map((role) => {
        if (!role)
          throw new NotFoundException(
            this.i18nService.t('exception.not_found', {
              args: { entity: this.i18nService.t('model.role.entity') },
            }),
          );

        return role;
      }),
    );
  }

  create(data: CreateRoleDto) {
    return this.roleRepository.create(data);
  }

  update(id: string, data: UpdateRoleDto) {
    return this.get(id).pipe(
      switchMap((role) => this.roleRepository.update(role, data)),
    );
  }
}
