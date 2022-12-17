import { BaseRepository } from '@common/repositories/base.repository';
import { Client } from '@modules/client/entities/client.entity';

export class ClientRepository extends BaseRepository<Client> {
  constructor() {
    super(Client);
  }
}
