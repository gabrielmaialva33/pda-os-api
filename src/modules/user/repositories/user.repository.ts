import { BaseRepository } from '@common/repositories/base.repository';
import { User } from '@modules/user/entities/user.entity';
import { IUserRepository } from '@modules/user/interfaces';
import { forkJoin, from, map, Observable, switchMap } from 'rxjs';

export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor() {
    super(User);
  }

  syncRoles(user: User, roleIds: string[]): Observable<User> {
    const unrelatedRoles$ = from(user.$relatedQuery('roles').unrelate());
    const relateRoles$ = from(user.$relatedQuery('roles').relate(roleIds));

    return forkJoin([unrelatedRoles$, relateRoles$]).pipe(
      switchMap(() => this.getBy(['id'], user.id, { populate: ['roles'] })),
    );
  }
}
