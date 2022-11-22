import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';

import { StoreRoleDto } from './dto/store-role.dto';
import { EditRoleDto } from './dto/edit-role.dto';
import { PrismaService } from '@prisma/prisma.service';
import { PaginateOptions } from '@prisma/prisma.module';
import { RoleEntity } from '@/modules/role/entities/role.entity';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  list({ page, perPage, search, sort, direction }: PaginateOptions) {
    return this.prisma.paginate<Role, Prisma.RoleFindManyArgs>(
      this.prisma.role,
      {
        page,
        perPage,
        sort,
        direction,
        search,
        searchFields: RoleEntity.searchScope,
      },
      {
        select: RoleEntity.publicScope,
      },
    );
  }

  get(id: string) {
    return this.prisma.role.findUnique({
      select: RoleEntity.publicScope,
      where: { id },
    });
  }

  store(data: StoreRoleDto) {
    return this.prisma.role.create({
      select: RoleEntity.publicScope,
      data,
    });
  }

  save(id: string, data: EditRoleDto) {
    return this.prisma.role.update({
      select: RoleEntity.publicScope,
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.role.delete({
      where: { id },
    });
  }
}
