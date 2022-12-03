import { IsStringMinMax } from '@common/validators';

export class StoreCollaboratorDto {
  @IsStringMinMax({ min: 11, max: 14, optional: true })
  cpf: string;

  @IsStringMinMax({ min: 11, max: 20, optional: true })
  phone: string;

  @IsStringMinMax({ min: 8, max: 8, optional: true })
  code: string;
}
