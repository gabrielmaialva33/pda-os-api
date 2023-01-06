import { Module } from '@nestjs/common';
import { SignatureController } from '@modules/signature/controllers/signature.controller';
import { SignatureService } from '@modules/signature/services/signature.service';

@Module({
  controllers: [SignatureController],
  providers: [SignatureService],
})
export class SignatureModule {}
