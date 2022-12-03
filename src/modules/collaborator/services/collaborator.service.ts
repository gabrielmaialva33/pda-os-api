import { Injectable } from '@nestjs/common';
import { EditCollaboratorDto, StoreCollaboratorDto } from '@collaborator/dto';

@Injectable()
export class CollaboratorService {
  create(createCollaboratorDto: StoreCollaboratorDto) {
    return 'This action adds a new collaborator';
  }

  findAll() {
    return `This action returns all collaborator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collaborator`;
  }

  update(id: number, updateCollaboratorDto: EditCollaboratorDto) {
    return `This action updates a #${id} collaborator`;
  }

  remove(id: number) {
    return `This action removes a #${id} collaborator`;
  }
}
