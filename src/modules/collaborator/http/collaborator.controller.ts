import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { CollaboratorService } from '@collaborator/services/collaborator.service';
import { EditCollaboratorDto, StoreCollaboratorDto } from '@collaborator/dto';
import { I18nValidationExceptionFilter } from '@common/filters';
import { JwtAuthGuard } from '@common/guards/jwt.auth.guard';

@UseFilters(new I18nValidationExceptionFilter())
@UseGuards(JwtAuthGuard)
@Controller('collaborators')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @Get()
  list(
    @Query('page') page?: number,
    @Query('per_page') per_page?: number,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('direction') direction?: string,
  ) {
    return this.collaboratorService.list({
      page,
      per_page,
      search,
      sort,
      direction,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collaboratorService.get(id);
  }

  @Post()
  create(@Body() data: StoreCollaboratorDto) {
    return this.collaboratorService.store(data);
  }

  @Put(':id')
  edit(@Param('id') id: string, @Body() data: EditCollaboratorDto) {
    return this.collaboratorService.save(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.collaboratorService.delete(id);
  }
}
