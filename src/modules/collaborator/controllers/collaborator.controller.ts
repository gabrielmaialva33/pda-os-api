import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@common/guards/jwt.auth.guard';

import { CollaboratorService } from '@modules/collaborator/services/collaborator.service';
import {
  CreateCollaboratorDto,
  UpdateCollaboratorDto,
} from '@modules/collaborator/dto';
import { ModelProps } from 'objection';
import { Collaborator } from '@modules/collaborator/entities/collaborator.entity';

@UseGuards(JwtAuthGuard)
@Controller('collaborators')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @Get()
  paginate(
    @Query('page') page: number,
    @Query('per_page') per_page: number,
    @Query('sort') sort: ModelProps<Collaborator>,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.collaboratorService.paginate({
      page,
      per_page,
      sort,
      order,
    });
  }

  @Get('all')
  list(
    @Query('sort') sort: ModelProps<Collaborator>,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.collaboratorService.list({ sort, order });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.collaboratorService.get(id);
  }

  @Post()
  create(@Body() data: CreateCollaboratorDto) {
    return this.collaboratorService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateCollaboratorDto) {
    return this.collaboratorService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collaboratorService.remove(id);
  }
}
