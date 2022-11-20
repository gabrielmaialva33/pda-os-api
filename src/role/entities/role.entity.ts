import { Prisma, Role } from '@prisma/client';

export class RoleEntity implements Role {
  static readonly model = 'Role';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   * - column typing struct
   */
  id: string;
  name: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  /**
   * ------------------------------------------------------
   * Scopes
   * ------------------------------------------------------
   */
  static publicScope: Prisma.RoleSelect = {
    id: true,
    name: true,
  };

  static searchScope: Array<keyof RoleEntity> = ['name'];

  /**
   * ------------------------------------------------------
   * Misc
   * ------------------------------------------------------
   */
  constructor(role: Role) {
    Object.assign(this, role);
  }
}
