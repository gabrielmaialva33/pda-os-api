import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '@auth/services/auth.service';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly i18n: I18nService,
  ) {
    super({
      usernameField: 'uid',
      passwordField: 'password',
    });
  }

  async validate(uid: string, password: string): Promise<any> {
    const user = await this.authService.validate(uid, password);
    if (!user)
      throw new UnauthorizedException({
        message: this.i18n.t(`exception.invalid_credentials`),
        status: 401,
        display: true,
      });
    return user;
  }
}
