import { Injectable } from '@nestjs/common';

import { PrismaService } from '@prisma/prisma.service';
import { StoreUserDto, EditUserDto } from '@user/dto';
import { UserEntity } from '@user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.user.findMany({
      select: UserEntity.publicScope,
    });
  }

  get(id: string) {
    return this.prisma.user.findUnique({
      select: UserEntity.publicScope,
      where: { id },
    });
  }

  store(data: StoreUserDto) {
    return this.prisma.user.create({
      select: UserEntity.publicScope,
      data,
    });
  }

  save(id: string, data: EditUserDto) {
    return this.prisma.user.update({
      select: UserEntity.publicScope,
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
