import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthService } from '@modules/auth/services/auth.service';
import { SignInUserDto } from '@modules/auth/dto';
import { LocalAuthGuard } from '@common/guards/local.auth.guard';

@UseGuards(LocalAuthGuard)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign_in')
  async signIn(@Body() body: SignInUserDto) {
    return this.authService.login(body);
  }
}
