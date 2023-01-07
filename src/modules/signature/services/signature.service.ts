import { Injectable } from '@nestjs/common';

import { CreateSignatureDto, UpdateSignatureDto } from '@modules/signature/dto';

@Injectable()
export class SignatureService {
  paginate() {
    return `This action returns all signature`;
  }

  get(id: string) {
    return `This action returns a #${id} signature`;
  }

  create(data: CreateSignatureDto) {
    return `This action adds a new signature`;
  }

  update(id: string, data: UpdateSignatureDto) {
    return `This action updates a #${id} signature`;
  }

  remove(id: string) {
    return `This action removes a #${id} signature`;
  }
}
