import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '@prisma/prisma.service';
import { EditUserDto, StoreUserDto } from '@user/dto';
import { UserEntity } from '@user/entities/user.entity';
import { PaginateOptions } from '@prisma/prisma.module';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  list({ page, perPage, search, sort, direction }: PaginateOptions) {
    return this.prisma.paginate<User, Prisma.UserFindManyArgs>(
      this.prisma.user,
      {
        page,
        perPage,
        sort,
        direction,
        search,
        searchFields: UserEntity.searchScope,
      },
      {
        select: UserEntity.publicScope,
      },
    );
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

  getBy(keys: string[], value) {
    const OR: Prisma.UserWhereInput['OR'] = [];
    for (const key of keys) OR.push({ [key]: { equals: value } });
    return this.prisma.user.findFirst({
      where: {
        OR: OR,
      },
    });
  }
}
