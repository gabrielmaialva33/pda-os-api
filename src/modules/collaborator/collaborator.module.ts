import { Module } from '@nestjs/common';
import { CollaboratorController } from '@collaborator/http/collaborator.controller';
import { CollaboratorService } from '@collaborator/services/collaborator.service';

@Module({
  controllers: [CollaboratorController],
  providers: [CollaboratorService],
})
export class CollaboratorModule {}
