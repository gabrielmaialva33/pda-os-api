import { Module } from '@nestjs/common';

import { TokenService } from '@modules/token/token.service';
import { TokenRepository } from '@modules/token/repositories/token.repository';

@Module({
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
