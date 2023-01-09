import { Injectable, NotFoundException } from '@nestjs/common';
import { forkJoin, from, map, switchMap } from 'rxjs';
import { I18nService } from 'nestjs-i18n';
import { ModelProps } from 'objection';

import { I18nTranslations } from '@/resources/i18n/generated/i18n.generated';
import { PaginationObject } from '@lib/pagination';
import { ListOptions } from '@common/interfaces/base-repository.interface';

import { CreateUserDto, UpdateUserDto } from '@modules/user/dto';
import { User } from '@modules/user/entities/user.entity';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { RoleRepository } from '@modules/role/repositories/role.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

  list({ sort, order }: ListOptions<User>) {
    return from(this.userRepository.list({ sort, order })).pipe(
      map((users) => users),
    );
  }

  get(id: string) {
    return from(
      this.userRepository.getBy(['id'], id, {
        populate: '[roles]',
      }),
    ).pipe(
      map((user) => {
        if (!user)
          throw new NotFoundException(
            this.i18nService.t('exception.not_found', {
              args: { entity: this.i18nService.t('model.user.entity') },
            }),
          );

        return user;
      }),
    );
  }

  create({ role, ...data }: CreateUserDto) {
    const role$ = this.roleRepository.getBy(['name'], role);
    const user$ = this.userRepository.create(data);

    return forkJoin([role$, user$]).pipe(
      switchMap(([role, user]) =>
        this.userRepository.syncRoles(user, [role.id]),
      ),
    );
  }

  update(id: string, { role: roleName, ...data }: UpdateUserDto) {
    return this.get(id).pipe(
      switchMap((user) => {
        const user$ = this.userRepository.update(user, data);

        if (roleName) {
          const role$ = this.roleRepository.getBy(['name'], roleName);
          return forkJoin([role$, user$]).pipe(
            switchMap(([role, user]) => {
              return this.userRepository.syncRoles(user, [role.id]);
            }),
          );
        }

        return user$;
      }),
    );
  }

  remove(id: string) {
    return from(this.userRepository.softDelete(id)).pipe(map((user) => user));
  }

  paginate({ page, per_page, search, sort, order }: ListOptions<User>) {
    return from(
      this.userRepository.paginate({
        page,
        per_page,
        search,
        sort,
        order,
        context: { populate: '[roles]' },
      }),
    ).pipe(
      map(({ total, results: data }) =>
        PaginationObject<User>({
          data,
          total,
          page,
          per_page,
          route: '/users',
        }),
      ),
    );
  }

  getBy(keys: ModelProps<User>[], value: any) {
    return from(
      this.userRepository.getBy(keys, value, {
        populate: '[roles]',
      }),
    ).pipe(
      map((user) => {
        if (!user)
          throw new NotFoundException(
            this.i18nService.t('exception.not_found', {
              args: { entity: this.i18nService.t('model.user.entity') },
            }),
          );

        return user;
      }),
    );
  }
}
