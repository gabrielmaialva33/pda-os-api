import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UploadedFile,
  UseInterceptors,
  Req,
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
    FastifyFilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  multiple(
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: MultipleFilesDto,
  ) {
    return { ...body, photo_url: filesMapper({ files, req }) };
  }
}
