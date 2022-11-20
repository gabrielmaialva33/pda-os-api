import { Module } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@/modules/user/user.module';
import { LocalStrategy } from '@/modules/auth/strategies/local.strategy';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';
import { AuthController } from '@/modules/auth/auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
