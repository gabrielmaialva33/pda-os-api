import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply, next: CallableFunction): void {
    // TODO: use this.logger.log
    console.log(
      `[API Request] ${req.method} ${req.url}: ${JSON.stringify(req.body)}`,
    );

    Logger.log(
      `${req.method} ${req.url}: ${JSON.stringify(req.body)}`,
      'API Request',
    );

    next();
  }
}
