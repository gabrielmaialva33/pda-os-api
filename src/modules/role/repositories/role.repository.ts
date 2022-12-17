import { BaseRepository } from '@common/repositories/base.repository';
import { Role } from '@modules/role/entities/role.entity';

export class RoleRepository extends BaseRepository<Role> {
  constructor() {
    super(Role);
  }
}
