import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { I18nService } from 'nestjs-i18n';

import { AuthService } from '@modules/auth/services/auth.service';
import { from, map } from 'rxjs';

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

  validate(uid: string, password: string) {
    return from(this.authService.validate(uid, password)).pipe(
      map((user) => {
        if (!user)
          throw new UnauthorizedException(
            this.i18n.translate('exception.invalid_credentials'),
          );
        return user;
      }),
    );
  }
}
