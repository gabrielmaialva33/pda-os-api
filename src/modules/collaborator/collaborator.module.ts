import { Module } from '@nestjs/common';

import { CollaboratorController } from '@collaborator/http/collaborator.controller';
import { CollaboratorService } from '@collaborator/services/collaborator.service';
import { OrmModule } from '@src/lib/orm/orm.module';

@Module({
  imports: [OrmModule],
  controllers: [CollaboratorController],
  providers: [CollaboratorService],
  exports: [CollaboratorService],
})
export class CollaboratorModule {}
