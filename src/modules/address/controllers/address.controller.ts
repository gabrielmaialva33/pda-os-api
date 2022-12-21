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
import { ModelProps } from 'objection';

import { JwtAuthGuard } from '@common/guards/jwt.auth.guard';

import { AddressService } from '@modules/address/services/address.service';
import { CreateAddressDto, UpdateAddressDto } from '@modules/address/dto';
import { Address } from '@modules/address/entities/address.entity';

@UseGuards(JwtAuthGuard)
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  paginate(
    @Query('page') page: number,
    @Query('per_page') per_page: number,
    @Query('sort') sort: ModelProps<Address>,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.addressService.paginate({
      page,
      per_page,
      sort,
      order,
    });
  }

  @Get('all')
  list(
    @Query('sort') sort: ModelProps<Address>,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.addressService.list({
      sort,
      order,
    });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.addressService.get(id);
  }

  @Post()
  create(@Body() data: CreateAddressDto) {
    return this.addressService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateAddressDto) {
    return this.addressService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}
