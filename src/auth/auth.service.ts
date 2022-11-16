import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(uid: string, password: string): Promise<any> {
    const user = await this.userService.getBy(['email', 'user_name'], [uid]);
    if (user && (await argon2.verify(user.password, password)))
      return {
        id: user.id,
        email: user.email,
        user_name: user.user_name,
        first_name: user.first_name,
        last_name: user.last_name,
        is_online: user.is_online,
      };
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      user,
      auth: {
        token: this.jwtService.sign(payload, {
          expiresIn: '1d',
        }),
        expires_at: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // 1 day
      },
    };
  }
}
