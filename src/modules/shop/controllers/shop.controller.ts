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

import { ShopService } from '@modules/shop/services/shop.service';
import { CreateShopDto, UpdateShopDto } from '@modules/shop/dto';
import { Shop } from '@modules/shop/entities/shop.entity';

@UseGuards(JwtAuthGuard)
@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  paginate(
    @Query('page') page: number,
    @Query('per_page') per_page: number,
    @Query('search') search: string,
    @Query('sort') sort: ModelProps<Shop>,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.shopService.paginate({ page, per_page, search, sort, order });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.shopService.get(id);
  }

  @Post()
  create(@Body() data: CreateShopDto) {
    return this.shopService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateShopDto) {
    return this.shopService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopService.remove(id);
  }
}
