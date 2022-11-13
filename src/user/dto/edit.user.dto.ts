import { PartialType } from '@nestjs/mapped-types';
import { StoreUserDto } from './store.user.dto';

export class EditUserDto extends PartialType(StoreUserDto) {}
