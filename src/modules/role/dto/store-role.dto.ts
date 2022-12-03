import { IsStringMinMax, IsUnique } from '@common/validators';
import { RoleEntity } from '@role/entities/role.entity';
import { i18nValidationMessage } from 'nestjs-i18n';

export class StoreRoleDto {
  @IsUnique(() => RoleEntity, 'slug', {
    message: i18nValidationMessage('validation.isUnique', {
      field: 'slug',
    }),
  })
  @IsStringMinMax({ min: 4, max: 50, optional: false })
  slug: string;

  @IsStringMinMax({ min: 4, max: 255, optional: false })
  description: string;
}
