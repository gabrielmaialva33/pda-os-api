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

import { PhoneService } from '@modules/phone/services/phone.service';
import { CreatePhoneDto, UpdatePhoneDto } from '@modules/phone/dto';
import { ModelProps } from 'objection';
import { Phone } from '@modules/phone/entities/phone.entity';

@UseGuards(JwtAuthGuard)
@Controller('phones')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Get()
  list(
    @Query('page') page?: number,
    @Query('per_page') per_page?: number,
    @Query('sort') sort?: ModelProps<Phone>,
    @Query('order') order?: 'asc' | 'desc',
  ) {
    return this.phoneService.paginate({
      page,
      per_page,
      sort,
      order,
    });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.phoneService.get(id);
  }

  @Post()
  create(@Body() data: CreatePhoneDto) {
    return this.phoneService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdatePhoneDto) {
    return this.phoneService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phoneService.remove(id);
  }
}
