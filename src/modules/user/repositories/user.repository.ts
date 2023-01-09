import { forkJoin, from, map, Observable, switchMap } from 'rxjs';
import { DateTime } from 'luxon';

import { BaseRepository } from '@common/repositories/base.repository';
import { User } from '@modules/user/entities/user.entity';
import { IUserRepository } from '@modules/user/interfaces';

export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor() {
    super(User);
  }

  softDelete(id: string): Observable<User> {
    return this.getBy(['id'], id).pipe(
      switchMap((user) =>
        from(
          user.$query().patchAndFetch({
            email: `${user.email}-${user.id.slice(0, 8)}`,
            user_name: `${user.user_name}-${user.id.slice(0, 8)}`,
            is_deleted: true,
            deleted_at: DateTime.local().toISO(),
          }),
        ).pipe(map((user) => user)),
      ),
    );
  }

  syncRoles(user: User, roleIds: string[]): Observable<User> {
    const unrelatedRoles$ = from(user.$relatedQuery('roles').unrelate());
    const relateRoles$ = from(user.$relatedQuery('roles').relate(roleIds));

    return forkJoin([unrelatedRoles$, relateRoles$]).pipe(
      switchMap(() => this.getBy(['id'], user.id, { populate: '[roles]' })),
    );
  }
}
