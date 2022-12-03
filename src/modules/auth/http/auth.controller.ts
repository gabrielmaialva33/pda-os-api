import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from '@auth/services/auth.service';
import { LocalAuthGuard } from '@common/guards/local.auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/sign_in')
  async signIn(@Request() req) {
    return this.authService.login(req.user);
  }
}
