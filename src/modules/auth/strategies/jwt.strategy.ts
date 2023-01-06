import { lastValueFrom } from 'rxjs';
import { I18nService } from 'nestjs-i18n';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { UserRepository } from '@modules/user/repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly config: ConfigService,
    private readonly i18n: I18nService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwt.secret') || 'secret',
    });
  }

  async validate(payload: any) {
    const { sub: id } = payload;
    const user = await lastValueFrom(this.userRepo.getBy(['id'], id));
    if (!user)
      throw new ForbiddenException(
        this.i18n.translate('exception.account_not_found'),
      );

    if (user.is_deleted)
      throw new ForbiddenException(
        this.i18n.translate('exception.account_deleted'),
      );

    return user;
  }
}
