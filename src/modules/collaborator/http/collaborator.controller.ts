import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CollaboratorService } from '@collaborator/services/collaborator.service';
import { EditCollaboratorDto, StoreCollaboratorDto } from '@collaborator/dto';

@Controller('collaborators')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @Post()
  create(@Body() data: StoreCollaboratorDto) {
    return this.collaboratorService.create(data);
  }

  @Get()
  findAll() {
    return this.collaboratorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collaboratorService.findOne(+id);
  }

  @Patch(':id')
  edit(@Param('id') id: string, @Body() data: EditCollaboratorDto) {
    return this.collaboratorService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.collaboratorService.remove(+id);
  }
}
