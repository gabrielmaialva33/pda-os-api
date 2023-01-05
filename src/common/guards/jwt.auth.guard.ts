import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '@modules/token/token.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwt: JwtService,
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) throw new UnauthorizedException('Token not found in request');

    return super.canActivate(context);
  }

  handleRequest(error: any, user: any, info: any) {
    if (error || info || !user) {
      if (info?.name === 'TokenExpiredError')
        throw new UnauthorizedException(
          'The session has expired. Please relogin',
        );
      else if (info?.name === 'JsonWebTokenError')
        throw new UnauthorizedException('Token malformed');
      else throw new UnauthorizedException(info?.message);
    }

    return user;
  }
}
