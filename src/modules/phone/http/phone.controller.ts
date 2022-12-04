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
import { PhoneService } from '@phone/services/phone.service';
import { EditPhoneDto, StorePhoneDto } from '@phone/dto';
import { I18nValidationExceptionFilter } from '@common/filters';
import { JwtAuthGuard } from '@common/guards/jwt.auth.guard';

@UseFilters(new I18nValidationExceptionFilter())
@UseGuards(JwtAuthGuard)
@Controller('phones')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Get()
  list(
    @Query('page') page?: number,
    @Query('per_page') per_page?: number,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('direction') direction?: string,
  ) {
    return this.phoneService.list({
      page,
      per_page,
      search,
      sort,
      direction,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phoneService.get(id);
  }

  @Post()
  create(@Body() data: StorePhoneDto) {
    return this.phoneService.store(data);
  }

  @Put(':id')
  edit(@Param('id') id: string, @Body() updatePhoneDto: EditPhoneDto) {
    return this.phoneService.save(id, updatePhoneDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.phoneService.delete(id);
  }
}
