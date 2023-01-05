import { Module } from '@nestjs/common';

import { FileService } from '@modules/file/file.service';
import { FileController } from '@modules/file/file.controller';

@Module({
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
