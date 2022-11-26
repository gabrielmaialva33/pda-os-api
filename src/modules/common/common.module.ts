import { Module } from '@nestjs/common';
import { UniqueConstraint } from '@common/validators/unique.validator';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  providers: [UniqueConstraint],
  imports: [MikroOrmModule],
  exports: [UniqueConstraint],
})
export class CommonModule {}
