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

import { AddressService } from '@address/services/address.service';
import { EditAddressDto, StoreAddressDto } from '@address/dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  list(
    @Query('page') page?: number,
    @Query('per_page') per_page?: number,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('direction') direction?: string,
  ) {
    return this.addressService.list({
      page,
      per_page,
      search,
      sort,
      direction,
    });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.addressService.get(id);
  }

  @Post()
  create(@Body() data: StoreAddressDto) {
    return this.addressService.store(data);
  }

  @Put(':id')
  edit(@Param('id') id: string, @Body() data: EditAddressDto) {
    return this.addressService.save(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.delete(id);
  }
}
