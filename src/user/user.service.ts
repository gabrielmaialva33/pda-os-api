import { Injectable } from '@nestjs/common';
import { StoreUserDto } from './dto/store.user.dto';
import { EditUserDto } from './dto/edit.user.dto';

@Injectable()
export class UserService {
  create(data: StoreUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, data: EditUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
