import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateSignatureDto, UpdateSignatureDto } from '@modules/signature/dto';
import { SignatureService } from '@modules/signature/services/signature.service';

@Controller('signature')
export class SignatureController {
  constructor(private readonly signatureService: SignatureService) {}

  @Get()
  paginate() {
    return this.signatureService.paginate();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.signatureService.get(id);
  }

  @Post()
  create(@Body() data: CreateSignatureDto) {
    return this.signatureService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateSignatureDto) {
    return this.signatureService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signatureService.remove(id);
  }
}
