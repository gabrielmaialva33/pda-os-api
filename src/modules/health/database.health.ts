import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { Connection, KNEX_CONNECTION } from '@willsoto/nestjs-objection';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseHealthIndicator extends HealthIndicator {
  constructor(@Inject(KNEX_CONNECTION) public connection: Connection) {
    super();
  }

  async isHealthy(key = 'database'): Promise<HealthIndicatorResult> {
    try {
      await this.connection.raw('SELECT 1');
      return super.getStatus(key, true);
    } catch (error) {
      const status = super.getStatus(key, false, { message: error.message });
      throw new HealthCheckError('Unable to connect to database', status);
    }
  }
}
