import { BaseRepository } from '@common/repositories/base.repository';
import { Role } from '@modules/role/entities/role.entity';
import { IRoleRepository } from '@modules/role/interfaces';

export class RoleRepository
  extends BaseRepository<Role>
  implements IRoleRepository
{
  constructor() {
    super(Role);
  }
}
