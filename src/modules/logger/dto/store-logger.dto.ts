import { LoggerEntity } from '@logger/entities/logger.entity';

export class StoreLoggerDto implements Partial<LoggerEntity> {
  ip: string;
  remote_ip: string;
  remote_port: number;
  remote_family: string;
  method: string;
  url: string;
  protocol: string;
  parameters: object;
  query: object;
  headers: object;
}
