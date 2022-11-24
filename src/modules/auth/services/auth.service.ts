import * as argon2 from 'argon2';
import { DateTime } from 'luxon';
import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/services/user.service';
import { UserEntity } from '@user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(uid: string, password: string): Promise<any> {
    const user = await this.userService.getBy(['email', 'user_name'], [uid]);
    if (user && (await argon2.verify(user.password, password))) return user;
    return null;
  }

  async login(user: UserEntity) {
    return {
      user,
      auth: {
        token: this.jwtService.sign(
          { sub: user.id },
          {
            expiresIn: '1d',
          },
        ),
        expires_at: DateTime.local().plus({ days: 1 }).toISO(),
      },
    };
  }
}
