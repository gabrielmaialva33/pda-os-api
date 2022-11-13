import * as argon2 from 'argon2';
import { Prisma, User } from '@prisma/client';

export class UserEntity implements User {
  static readonly model = 'User';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   * - column typing struct
   */
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  user_name: string;
  password: string;
  is_online: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */
  static async hashPassword(params: Prisma.MiddlewareParams, next) {
    if (params.model === UserEntity.model && params.action === 'create') {
      const user = params.args.data;
      user.password = await argon2.hash(user.password);
      params.args.data = user;
    }

    return next(params);
  }

  /**
   * ------------------------------------------------------
   * Scopes
   * ------------------------------------------------------
   */

  /**
   * ------------------------------------------------------
   * Misc
   * ------------------------------------------------------
   */
}
