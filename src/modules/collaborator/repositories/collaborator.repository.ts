import { BaseRepository } from '@common/repositories/base.repository';
import { Collaborator } from '@modules/collaborator/entities/collaborator.entity';

export class CollaboratorRepository extends BaseRepository<Collaborator> {
  constructor() {
    super(Collaborator);
  }
}
