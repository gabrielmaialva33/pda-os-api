import * as argon2 from 'argon2';
import { Prisma, User } from '@prisma/client';

export class UserEntity implements User {
  static readonly model = 'User';
  /**
   * ------------------------------------------------------
   * Scopes
   * ------------------------------------------------------
   */
  static publicScope: Prisma.UserSelect = {
    id: true,
    first_name: true,
    last_name: true,
    email: true,
    user_name: true,
    is_online: true,
  };
  static searchScope: Array<keyof UserEntity> = [
    'first_name',
    'last_name',
    'email',
    'user_name',
  ];
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
    if (
      params.model === UserEntity.model &&
      ['create', 'update'].includes(params.action)
    ) {
      const user = params.args.data;
      if (user.password)
        user.password = await argon2.hash(user.password, { saltLength: 32 });
      params.args.data = user;
    }

    return next(params);
  }

  /**
   * ------------------------------------------------------
   * Misc
   * ------------------------------------------------------
   */
}
