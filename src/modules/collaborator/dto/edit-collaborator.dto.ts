import { PartialType } from '@nestjs/mapped-types';

import { StoreCollaboratorDto } from '@collaborator/dto/store-collaborator.dto';

export class EditCollaboratorDto extends PartialType(StoreCollaboratorDto) {}
