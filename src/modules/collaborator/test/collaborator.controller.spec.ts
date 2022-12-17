import { Test, TestingModule } from '@nestjs/testing';
import { CollaboratorController } from '@modules/collaborator/controllers/collaborator.controller';
import { CollaboratorService } from '@modules/collaborator/services/collaborator.service';

describe('CollaboratorController', () => {
  let controller: CollaboratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollaboratorController],
      providers: [CollaboratorService],
    }).compile();

    controller = module.get<CollaboratorController>(CollaboratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
