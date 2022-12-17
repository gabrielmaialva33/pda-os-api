import { BaseRepository } from '@common/repositories/base.repository';
import { User } from '@modules/user/entities/user.entity';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }
}
