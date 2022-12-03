import { UserEntity } from '@user/entities/user.entity';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { IsPassword, IsStringMinMax, IsUnique } from '@common/validators';
import { i18nValidationMessage } from 'nestjs-i18n';

import { RoleEntity } from '@role/entities/role.entity';
import { Collection } from '@mikro-orm/core';

export class StoreUserDto {
  @IsStringMinMax({ min: 2, max: 80, optional: false })
  first_name: string;

  @IsStringMinMax({ min: 2, max: 80, optional: false })
  last_name: string;

  @IsUnique(() => UserEntity, 'email', {
    message: i18nValidationMessage('validation.isUnique', {
      field: 'email',
    }),
  })
  @IsEmail(
    {},
    {
      message: i18nValidationMessage('validation.isDataType', {
        type: 'email',
      }),
    },
  )
  email: string;

  @IsUnique(() => UserEntity, 'user_name', {
    message: i18nValidationMessage('validation.isUnique', {
      field: 'username',
    }),
  })
  @IsStringMinMax({ min: 4, max: 50, optional: false })
  user_name: string;

  @IsNotEmpty()
  @IsPassword({ message: i18nValidationMessage('validation.isPassword') })
  @Length(6, 20, {
    message: i18nValidationMessage('validation.length', {
      min: 6,
      max: 20,
    }),
  })
  password: string;

  @IsStringMinMax({ min: 11, max: 14, optional: true })
  cpf: string;

  @IsStringMinMax({ min: 11, max: 20, optional: true })
  phone: string;

  @IsStringMinMax({ min: 8, max: 8, optional: true })
  code: string;

  @IsNotEmpty()
  roles: Collection<RoleEntity> = new Collection<RoleEntity>(this);
}
