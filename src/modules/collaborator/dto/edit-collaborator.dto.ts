import { PartialType } from '@nestjs/mapped-types';
import { StoreCollaboratorDto } from './store-collaborator.dto';

export class EditCollaboratorDto extends PartialType(StoreCollaboratorDto) {}
