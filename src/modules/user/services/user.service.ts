import { Injectable, NotFoundException } from '@nestjs/common';
import { from, map, switchMap } from 'rxjs';
import { DateTime } from 'luxon';
import { I18nService } from 'nestjs-i18n';
import { ModelProps } from 'objection';

import { PaginationObject } from '@lib/pagination';
import { ListOptions } from '@common/interfaces/base-repository.interface';

import { CreateUserDto, UpdateUserDto } from '@modules/user/dto';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { User } from '@modules/user/entities/user.entity';
import { I18nTranslations } from '@/resources/i18n/generated/i18n.generated';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

  paginate({ page, per_page, search, sort, order }: ListOptions<User>) {
    return from(
      this.userRepository.paginate({
        page,
        per_page,
        search,
        sort,
        order,
        context: { populate: ['roles'] },
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

  list({ sort, order }: ListOptions<User>) {
    return from(this.userRepository.list({ sort, order })).pipe(
      map((users) => users),
    );
  }

  get(id: string) {
    return from(
      this.userRepository.getBy(['id'], id, {
        populate: ['roles'],
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

  getBy(keys: ModelProps<User>[], value: any) {
    return from(
      this.userRepository.getBy(keys, value, {
        populate: ['roles'],
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

  create({ roles: roleIds, ...data }: CreateUserDto) {
    return from(
      this.userRepository.create(data).pipe(
        switchMap(async (user) => {
          await user.$relatedQuery('roles').relate(roleIds);
          return user;
        }),
      ),
    );
  }

  update(id: string, { roles, ...data }: UpdateUserDto) {
    return this.get(id).pipe(
      switchMap(async (user) => {
        this.userRepository.update(user.id, data);

        if (roles && roles.length > 0) {
          await user.$relatedQuery('roles').unrelate();
          await user.$relatedQuery('roles').relate(roles);
        }
        return user.$query().withGraphFetched('roles');
      }),
    );
  }

  remove(id: string) {
    this.update(id, { deleted_at: DateTime.local().toISO() } as any);
  }
}
