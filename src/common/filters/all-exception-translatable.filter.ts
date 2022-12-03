import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { FastifyReply } from 'fastify';
import { getI18nContextFromArgumentsHost } from 'nestjs-i18n';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const i18n = getI18nContextFromArgumentsHost(host);

    const context = host.switchToHttp();
    const response = context.getResponse<FastifyReply>();
    const statusCode = exception.getStatus();

    let message = exception.getResponse() as {
      key: string;
      args: Record<string, any>;
      display?: boolean;
    };

    console.log(message.key);
    message = await i18n.t(message.key, {
      lang: host.switchToHttp().getRequest().i18nLang,
      args: message.args,
    });

    response
      .status(statusCode)
      .send({ status: statusCode, message, display: message.display || false });
  }
}
