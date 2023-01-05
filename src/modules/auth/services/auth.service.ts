import { from, map, of, switchMap, zip } from 'rxjs';
import { pick } from 'helper-fns';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';

import { Argon2Utils } from '@common/helpers';

import { User } from '@modules/user/entities/user.entity';
import { SignInUserDto } from '@modules/auth/dto';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { TokenService } from '@modules/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly i18n: I18nService,
  ) {}

  validate(uid: string, password: string) {
    return from(this.userRepository.getBy(User.uids, uid)).pipe(
      switchMap((user) => {
        if (!user)
          throw new ForbiddenException(
            this.i18n.translate('exception.account_not_found'),
          );

        if (user.is_deleted)
          throw new ForbiddenException(
            this.i18n.translate('exception.account_deleted'),
          );

        return of(Argon2Utils.verify(user.password, password)).pipe(
          map((isValid) => {
            if (!isValid)
              throw new UnauthorizedException(
                this.i18n.t('exception.invalid_credentials'),
              );

            return user;
          }),
        );
      }),
    );
  }

  login({ uid, password }: SignInUserDto) {
    return this.validate(uid, password).pipe(
      switchMap((user) => {
        if (!user)
          throw new UnauthorizedException(
            this.i18n.t('exception.invalid_credentials'),
          );

        return zip(this.tokenService.generateAccessToken(user), of(user)).pipe(
          map(([accessToken, user]) => ({
            user: pick(user, [
              'id',
              'first_name',
              'last_name',
              'full_name',
              'email',
              'user_name',
              'avatar',
            ]),
            auth: { token: accessToken },
          })),
        );
      }),
    );
  }
}
