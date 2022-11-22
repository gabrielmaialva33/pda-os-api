import { PartialType } from '@nestjs/mapped-types';
import { StoreRoleDto } from './store-role.dto';

export class EditRoleDto extends PartialType(StoreRoleDto) {}
