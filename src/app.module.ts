import { Module } from '@nestjs/common';

import { NestConfigModule } from '@lib/config/config.module';
import { NestPinoModule } from '@lib/pino/pino.module';
import { NestI18nModule } from '@lib/i18n/i18n.module';
import { OrmModule } from '@lib/orm/orm.module';
import { NestJwtModule } from '@lib/jwt/jwt.module';

import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { RoleModule } from '@modules/role/role.module';
import { PhoneModule } from '@modules/phone/phone.module';
import { AddressModule } from '@modules/address/address.module';
import { CollaboratorModule } from '@modules/collaborator/collaborator.module';
import { BankModule } from '@modules/bank/bank.module';

@Module({
  imports: [
    NestConfigModule,
    NestPinoModule,
    NestI18nModule,
    NestJwtModule,
    OrmModule,
    UserModule,
    AuthModule,
    RoleModule,
    PhoneModule,
    AddressModule,
    CollaboratorModule,
    BankModule,
  ],
})
export class AppModule {}
