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

import { ClientService } from '@client/services/client.service';
import { EditClientDto, StoreClientDto } from '@client/dto';
import { I18nValidationExceptionFilter } from '@common/filters';
import { JwtAuthGuard } from '@common/guards/jwt.auth.guard';

@UseFilters(new I18nValidationExceptionFilter())
@UseGuards(JwtAuthGuard)
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  list(
    @Query('page') page?: number,
    @Query('per_page') per_page?: number,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('direction') direction?: string,
  ) {
    return this.clientService.list({
      page,
      per_page,
      search,
      sort,
      direction,
    });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.clientService.get(id);
  }

  @Post()
  create(@Body() data: StoreClientDto) {
    return this.clientService.store(data);
  }

  @Put(':id')
  edit(@Param('id') id: string, @Body() data: EditClientDto) {
    return this.clientService.save(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.delete(id);
  }
}
