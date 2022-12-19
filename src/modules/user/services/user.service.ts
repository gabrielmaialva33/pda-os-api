import { Injectable, NotFoundException } from '@nestjs/common';
import { from, map, switchMap } from 'rxjs';
import { DateTime } from 'luxon';
import { I18nService } from 'nestjs-i18n';
import { ModelProps } from 'objection';

import { I18nTranslations } from '@/resources/i18n/generated/i18n.generated';
import { PaginationObject } from '@lib/pagination';
import { ListOptions } from '@common/interfaces/base-repository.interface';

import { CreateUserDto, UpdateUserDto } from '@modules/user/dto';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { User } from '@modules/user/entities/user.entity';
import { RoleService } from '@modules/role/services/role.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

  paginate({ page, per_page, sort, order }: ListOptions<User>) {
    return from(
      this.userRepository.paginate({
        page,
        per_page,
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

  create({ role, ...data }: CreateUserDto) {
    return from(this.roleService.getBy(['name'], role)).pipe(
      switchMap((role) => {
        return this.userRepository.create(data).pipe(
          switchMap(async (user) => {
            await user.$relatedQuery('roles').relate([role.id]);
            return user.$query().withGraphFetched('roles');
          }),
        );
      }),
    );
  }

  update(id: string, { role: roleName, ...data }: UpdateUserDto) {
    return this.get(id).pipe(
      switchMap((user) => {
        this.userRepository.update(user.id, data);

        if (roleName)
          return this.roleService
            .getBy(['name'], roleName)
            .pipe(switchMap((role) => this.syncRoles(user, [role.id])));

        return this.get(id);
      }),
    );
  }

  remove(id: string) {
    this.update(id, { deleted_at: DateTime.local().toISO() } as any);
  }

  syncRoles(user: User, roleIds: string[]) {
    return from(
      user
        .$relatedQuery('roles')
        .unrelate()
        .then(() => user.$relatedQuery('roles').relate(roleIds)),
    ).pipe(switchMap(() => this.get(user.id)));
  }
}
