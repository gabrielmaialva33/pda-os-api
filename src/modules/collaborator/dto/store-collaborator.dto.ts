import { IsArray, IsDateString, IsEnum, IsObject } from 'class-validator';
import { DateTime } from 'luxon';
import { Collection } from '@mikro-orm/core';

import { CivilStatus, Sexes, Status, WorkTypes } from '@common/types/enums';
import { IsStringMinMax } from '@common/validators';
import { UserEntity } from '@user/entities/user.entity';
import { PhoneEntity } from '@phone/entities/phone.entity';
import { AddressEntity } from '@address/entities/address.entity';

export class StoreCollaboratorDto {
  @IsStringMinMax({ min: 8, max: 8, optional: true })
  code: string;

  @IsStringMinMax({ min: 11, max: 14, optional: true })
  cpf: string;

  @IsStringMinMax({ min: 8, max: 18, optional: true })
  rg: string;

  @IsDateString()
  birth_date: DateTime;

  @IsStringMinMax({ min: 2, max: 100, optional: true })
  job: string;

  @IsEnum(Sexes)
  sex: Sexes;

  @IsEnum(WorkTypes)
  work_type: WorkTypes;

  @IsEnum(Status)
  status: Status;

  @IsEnum(CivilStatus)
  civil_status: CivilStatus;

  description: string;

  @IsObject()
  user: UserEntity;

  @IsArray()
  phones: Collection<PhoneEntity>;

  @IsArray()
  addresses: Collection<AddressEntity>;
}
