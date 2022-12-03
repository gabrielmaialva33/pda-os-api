import { IsDateString, IsEnum } from 'class-validator';
import { DateTime } from 'luxon';
import { Collection } from '@mikro-orm/core';

import { CivilStatus, Sexes, Status, WorkTypes } from '@common/types/enums';
import { IsStringMinMax } from '@common/validators';
import { UserEntity } from '@user/entities/user.entity';
import { AddressEntity } from '@collaborator/entities/address.entity';
import { PhoneEntity } from '@collaborator/entities/phone.entity';

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

  user: UserEntity;

  phones: Collection<PhoneEntity>;

  addresses: Collection<AddressEntity>;
}
