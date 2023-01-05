import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  editFileName,
  imageFileFilter,
} from '@common/helpers/file-upload-util';

import { FastifyFilesInterceptor } from '@common/interceptors/fastify-files-interceptor';
import { FastifyFileInterceptor } from '@common/interceptors/fastify-file-interceptor';
import { SingleFileDto } from '@modules/file/dto/single-file-dto';
import { diskStorage } from 'multer';
import { fileMapper, filesMapper } from '@common/helpers';
import { MultipleFilesDto } from '@modules/file/dto/multiple-files-dto';
import { Request } from 'express';
import { JwtAuthGuard } from '@common/guards/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('file')
export class FileController {
  @Post('single-file')
  @UseInterceptors(
    FastifyFileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  single(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: SingleFileDto,
  ) {
    return { ...body, file: fileMapper({ file, req }) };
  }

  @Post('multiple-file')
  @UseInterceptors(
    FastifyFilesInterceptor('file', 10, {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  multiple(
    @Req() req: Request,
    @UploadedFiles() file: Express.Multer.File[],
    @Body() body: MultipleFilesDto,
  ) {
    return { ...body, file: filesMapper({ file, req }) };
  }
}
