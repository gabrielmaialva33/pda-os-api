import { UserEntity } from '@user/entities/user.entity';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Unique } from '@common/validators/unique.validator';

export class StoreUserDto implements Partial<UserEntity> {
  @Length(4, 80)
  first_name: string;

  @Length(4, 80)
  last_name: string;

  @Unique(UserEntity, { message: 'Email already exists' })
  @IsEmail()
  email: string;

  @Unique(UserEntity, { message: 'Username already exists' })
  @Length(4, 50)
  user_name: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
