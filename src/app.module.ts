import { Module } from '@nestjs/common';

import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { HealthModule } from '@health/health.module';
import { LoggerModule } from '@logger/logger.module';
import { NestI18nModule } from '@src/lib/i18n/i18n.module';
import { OrmModule } from '@src/lib/orm/orm.module';
import { NestConfigModule } from '@src/lib/config/config.module';
import { CommonModule } from '@common/common.module';
import { RoleModule } from '@role/role.module';
import { CollaboratorModule } from '@collaborator/collaborator.module';
import { PhoneModule } from '@phone/phone.module';
import { AddressModule } from '@address/address.module';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    RoleModule,
    CollaboratorModule,
    HealthModule,
    LoggerModule,
    NestConfigModule,
    PhoneModule,
    AddressModule,
    CommonModule,
    NestI18nModule,
    OrmModule,
    ClientModule,
  ],
  exports: [],
})
export class AppModule {}
