import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: CallableFunction): void {
    // TODO: use this.logger.log
    console.log(
      `[API Request] ${req.method} ${req.originalUrl}: ${JSON.stringify(
        req.body,
      )}`,
    );

    Logger.log(
      `${req.method} ${req.originalUrl}: ${JSON.stringify(req.body)}`,
      'API Request',
    );

    next();
  }
}
