import { Observable } from 'rxjs';

import { IBaseRepository } from '@common/interfaces/base-repository.interface';
import { User } from '@modules/user/entities/user.entity';

export interface IUserRepository extends IBaseRepository<User> {
  syncRoles(user: User, roleIds: string[]): Observable<User>;

  softDelete(id: string): Observable<User>;
}
