import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ModelProps } from 'objection';

import { ClientService } from '@modules/client/services/client.service';
import { CreateClientDto, UpdateClientDto } from '@modules/client/dto';
import { Client } from '@modules/client/entities/client.entity';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  paginate(
    @Query('page') page: number,
    @Query('per_page') per_page: number,
    @Query('sort') sort: ModelProps<Client>,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.clientService.paginate({
      page,
      per_page,
      sort,
      order,
    });
  }

  @Get('all')
  list(
    @Query('sort') sort: ModelProps<Client>,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.clientService.list({
      sort,
      order,
    });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.clientService.get(id);
  }

  @Post()
  create(@Body() data: CreateClientDto) {
    return this.clientService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateClientDto) {
    return this.clientService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
