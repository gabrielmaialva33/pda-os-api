import { Injectable } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '@logger/services/logger.service';

@Injectable()
export class LoggerMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  async onRequest(request: FastifyRequest, reply: FastifyReply) {
    if (request.headers['authorization']) {
      const token = request.headers['authorization'].split(' ')[1];
      const decode = new JwtService().decode(token);
      console.log(decode);
    }

    await this.loggerService.store({
      ip: request.ip,
      remote_ip: request.socket.remoteAddress,
      remote_port: request.socket.remotePort,
      remote_family: request.socket.remoteFamily,
      method: request.method,
      url: request.url,
      protocol: request.protocol,
      parameters: JSON.parse(JSON.stringify(request.params)),
      query: JSON.parse(JSON.stringify(request.query)),
      headers: JSON.parse(JSON.stringify(request.headers)),
    });
  }
}
