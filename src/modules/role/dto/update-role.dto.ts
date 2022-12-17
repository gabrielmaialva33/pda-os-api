import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from '@modules/role/dto/create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
