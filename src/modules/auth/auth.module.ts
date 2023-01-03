import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { NestJwtModule } from '@lib/jwt/jwt.module';

import { AuthController } from '@modules/auth/controllers/auth.controller';
import { AuthService } from '@modules/auth/services/auth.service';
import { UserModule } from '@modules/user/user.module';
import { LocalStrategy } from '@modules/auth/strategies/local.strategy';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';
import { TokenModule } from '@modules/token/token.module';

@Module({
  imports: [UserModule, PassportModule, NestJwtModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [NestJwtModule, AuthService],
})
export class AuthModule {}
