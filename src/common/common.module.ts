import { Module } from '@nestjs/common';

import { IsExistsConstraint, IsUniqueConstraint } from '@common/validators';
import { OrmModule } from '@src/lib/orm/orm.module';

@Module({
  providers: [IsUniqueConstraint, IsExistsConstraint],
  imports: [OrmModule],
  exports: [IsUniqueConstraint, IsExistsConstraint],
})
export class CommonModule {}
