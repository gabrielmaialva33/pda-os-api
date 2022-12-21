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

import { CreateOrderDto, UpdateOrderDto } from '@modules/order/dto';
import { OrderService } from '@modules/order/services/order.service';
import { Order } from '@modules/order/entities/order.entity';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  paginate(
    @Query('page') page: number,
    @Query('per_page') per_page: number,
    @Query('sort') sort: ModelProps<Order>,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.orderService.paginate({
      page,
      per_page,
      sort,
      order,
    });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.orderService.get(id);
  }

  @Post()
  create(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateOrderDto) {
    return this.orderService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
