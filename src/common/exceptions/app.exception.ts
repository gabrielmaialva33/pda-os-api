import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(
    message: {
      key: string;
      args?: Record<string, any>;
      display?: boolean;
    },
    status: HttpStatus,
  ) {
    super(message, status);
  }
}
