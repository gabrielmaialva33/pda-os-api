import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ModelProps } from 'objection';

import { Auth } from '@common/decorators/auth.decorator';

import { CreateSignatureDto, UpdateSignatureDto } from '@modules/signature/dto';
import { SignatureService } from '@modules/signature/services/signature.service';
import { Signature } from '@modules/signature/entities/signature.entity';

@Auth()
@Controller('signatures')
export class SignatureController {
  constructor(private readonly signatureService: SignatureService) {}

  @Get()
  paginate(
    @Body('page') page: number,
    @Body('per_page') per_page: number,
    @Body('search') search: string,
    @Body('sort') sort: ModelProps<Signature>,
    @Body('order') order: 'asc' | 'desc',
  ) {
    return this.signatureService.paginate({
      page,
      per_page,
      search,
      sort,
      order,
    });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.signatureService.get(id);
  }

  @Post()
  create(@Body() data: CreateSignatureDto) {
    return this.signatureService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateSignatureDto) {
    return this.signatureService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signatureService.remove(id);
  }
}
