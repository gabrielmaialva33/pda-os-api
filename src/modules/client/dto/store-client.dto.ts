import { IsStringMinMax } from '@common/validators';
import { IsArray, IsDateString, ValidateNested } from 'class-validator';
import { DateTime } from 'luxon';
import { Type } from 'class-transformer';
import { EditUserDto } from '@user/dto';
import { UserEntity } from '@user/entities/user.entity';
import { Collection } from '@mikro-orm/core';
import { PhoneEntity } from '@phone/entities/phone.entity';
import { AddressEntity } from '@address/entities/address.entity';

export class StoreClientDto {
  @IsStringMinMax({ min: 11, max: 14, optional: true })
  cpf: string;

  @IsStringMinMax({ min: 8, max: 18, optional: true })
  rg: string;

  @IsDateString()
  birth_date: DateTime;

  @IsArray()
  phones: Collection<PhoneEntity>;

  @IsArray()
  addresses: Collection<AddressEntity>;

  @ValidateNested({ each: true })
  @Type(() => EditUserDto)
  user: UserEntity;
}
