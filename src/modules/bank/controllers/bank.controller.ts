import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ModelProps } from 'objection';

import { BankService } from '@modules/bank/services/bank.service';
import { CreateBankDto, UpdateBankDto } from '@modules/bank/dto';
import { Bank } from '@modules/bank/entities/bank.entity';

@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  paginate(
    @Query('page') page: number,
    @Query('per_page') per_page: number,
    @Query('sort') sort: ModelProps<Bank>,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.bankService.paginate({
      page,
      per_page,
      sort,
      order,
    });
  }

  @Get('all')
  list(
    @Query('sort') sort: ModelProps<Bank>,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.bankService.list({
      sort,
      order,
    });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.bankService.get(id);
  }

  @Post()
  create(@Body() data: CreateBankDto) {
    return this.bankService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateBankDto) {
    return this.bankService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankService.remove(id);
  }
}
