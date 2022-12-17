import { DateTime } from 'luxon';
import { pick } from 'helper-fns';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Argon2Utils } from '@common/helpers';
import { UserService } from '@modules/user/services/user.service';
import { User } from '@modules/user/entities/user.entity';
import { from, map, switchMap } from 'rxjs';
import { SignInUserDto } from '@modules/auth/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  validate(uid: string, password: string) {
    return from(this.userService.getBy(User.uids, uid)).pipe(
      switchMap((user) => {
        if (!user) return null;
        return Argon2Utils.verify(user.password, password).pipe(
          map((isValid) => (isValid ? user : null)),
        );
      }),
    );
  }

  login({ uid, password }: SignInUserDto) {
    return this.validate(uid, password).pipe(
      switchMap((user) => {
        if (!user) return null;
        const payload = { sub: user.id };
        return from(this.jwtService.signAsync(payload)).pipe(
          map((token) => {
            const expiresAt = DateTime.local().plus({ hours: 1 });
            return {
              user: {
                ...pick(user.$toJson(), [
                  'id',
                  'first_name',
                  'last_name',
                  'full_name',
                  'email',
                  'user_name',
                  'avatar',
                ]),
              },
              auth: { token, expires_at: expiresAt },
            };
          }),
        );
      }),
    );
  }
}
