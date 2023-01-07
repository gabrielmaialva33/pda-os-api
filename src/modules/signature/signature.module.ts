import { Module } from '@nestjs/common';
import { SignatureController } from '@modules/signature/controllers/signature.controller';
import { SignatureService } from '@modules/signature/services/signature.service';
import { SignatureRepository } from '@modules/signature/repositories/signature.repository';

@Module({
  controllers: [SignatureController],
  providers: [SignatureService, SignatureRepository],
})
export class SignatureModule {}
