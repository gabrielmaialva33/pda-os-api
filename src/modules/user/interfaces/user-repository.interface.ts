import { IBaseRepository } from '@common/interfaces/base-repository.interface';
import { User } from '@modules/user/entities/user.entity';
import { Observable } from 'rxjs';

export interface IUserRepository extends IBaseRepository<User> {
  syncRoles(user: User, roleIds: string[]): Observable<User>;
}
