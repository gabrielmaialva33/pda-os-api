import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from '@modules/auth/services/auth.service';
import { SignInUserDto } from '@modules/auth/dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign_in')
  async signIn(@Body() body: SignInUserDto) {
    return this.authService.login(body);
  }
}
