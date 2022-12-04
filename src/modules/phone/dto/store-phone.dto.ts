import { IsStringMinMax } from '@common/validators';
import { IsEnum } from 'class-validator';

import { PhoneType } from '@common/types/enums/phone-type.enum';

export class StorePhoneDto {
  @IsStringMinMax({ min: 1, max: 20, optional: true })
  phone: string;

  @IsEnum(PhoneType)
  type: PhoneType;
}
