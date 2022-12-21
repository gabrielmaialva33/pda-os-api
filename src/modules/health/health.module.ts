import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { OrmModule } from '@lib/orm/orm.module';

import { HealthController } from '@modules/health/health.controller';
import { DatabaseHealthIndicator } from '@modules/health/database.health';

@Module({
  imports: [TerminusModule, HttpModule, OrmModule],
  controllers: [HealthController],
  providers: [DatabaseHealthIndicator],
})
export class HealthModule {}
