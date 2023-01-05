import { Global, Module } from '@nestjs/common';

import { TokenService } from '@modules/token/token.service';
import { TokenRepository } from '@modules/token/repositories/token.repository';

@Global()
@Module({
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
