import { BaseRepository } from '@common/repositories/base.repository';
import { Signature } from '@modules/signature/entities/signature.entity';

export class SignatureRepository extends BaseRepository<Signature> {
  constructor() {
    super(Signature);
  }
}
