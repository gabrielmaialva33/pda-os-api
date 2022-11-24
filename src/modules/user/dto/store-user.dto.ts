import { UserEntity } from '@user/entities/user.entity';
import { IsEmail, Length } from 'class-validator';

export class StoreUserDto implements Partial<UserEntity> {
  @Length(4, 80)
  first_name: string;

  @Length(4, 80)
  last_name: string;

  @IsEmail()
  email: string;

  @Length(4, 50)
  user_name: string;

  @Length(6, 20)
  password: string;
}
