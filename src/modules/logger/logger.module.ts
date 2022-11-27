import { Module } from '@nestjs/common';

import { LoggerService } from '@logger/services/logger.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { LoggerEntity } from '@logger/entities/logger.entity';

@Module({
  imports: [MikroOrmModule.forFeature([LoggerEntity])],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
