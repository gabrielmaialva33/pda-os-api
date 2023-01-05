import { Injectable, UnauthorizedException } from '@nestjs/common';
import { forkJoin, from, map, Observable, switchMap } from 'rxjs';
import { pick } from 'helper-fns';
import { DateTime } from 'luxon';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { TokenRepository } from '@modules/token/repositories/token.repository';

import { User } from '@modules/user/entities/user.entity';
import { TokenType } from '@modules/token/enum/token-type.enum';

import { I18nService } from 'nestjs-i18n';

@Injectable()
export class TokenService {
  private readonly BASE_OPTIONS: JwtSignOptions = {
    issuer: 'pda.os.api',
    audience: 'pda.os.api',
    expiresIn: '1d',
  };

  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenRepository: TokenRepository,
    private readonly i18nService: I18nService,
  ) {}

  generateAccessToken(user: User): Observable<string> {
    const options: JwtSignOptions = {
      ...this.BASE_OPTIONS,
      subject: user.id,
    };

    const token$ = from(
      this.jwtService.signAsync(
        {
          ...pick(user, ['id', 'email', 'user_name']),
        },
        options,
      ),
    );

    const saveToken$ = token$.pipe(
      switchMap((token) =>
        this.tokenRepository.create({
          user_id: user.id,
          token,
          type: TokenType.ACCESS,
          expires_at: DateTime.local().plus({ days: 1 }).toISO(),
        }),
      ),
    );

    const revokeToken$ = this.tokenRepository.revoke(user, TokenType.ACCESS);

    return forkJoin([token$, saveToken$, revokeToken$]).pipe(
      map(([token]) => token),
    );
  }

  validateAccessToken(token: string): Observable<User> {
    return this.tokenRepository.validate(token, TokenType.ACCESS).pipe(
      switchMap((token) => {
        if (!token)
          throw new UnauthorizedException(
            this.i18nService.t('exception.access_token', {
              args: { error: 'invalid' },
            }),
          );

        return this.jwtService.verifyAsync(token.token, {
          issuer: this.BASE_OPTIONS.issuer,
          audience: this.BASE_OPTIONS.audience,
        });
      }),
      // catchError((error_) => {
      //   throw error_ instanceof TokenExpiredError
      //     ? new UnauthorizedException(
      //         this.i18nService.t('exception.access_token', {
      //           args: { error: 'expired' },
      //         }),
      //       )
      //     : new UnauthorizedException(
      //         this.i18nService.t('exception.access_token', {
      //           args: { error: 'revoked' },
      //         }),
      //       );
      // }),
    );
  }
}
