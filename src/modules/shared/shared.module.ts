import { Module } from '@nestjs/common';

// Import the SharedModule
import { NestConfigModule } from '@lib/config/config.module';
import { NestPinoModule } from '@lib/pino/pino.module';
import { NestI18nModule } from '@lib/i18n/i18n.module';
import { NestJwtModule } from '@lib/jwt/jwt.module';
import { OrmModule } from '@lib/orm/orm.module';

// This is the shared module that will be imported by the AppModule.
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { RoleModule } from '@modules/role/role.module';
import { PhoneModule } from '@modules/phone/phone.module';
import { AddressModule } from '@modules/address/address.module';
import { CollaboratorModule } from '@modules/collaborator/collaborator.module';
import { BankModule } from '@modules/bank/bank.module';
import { ClientModule } from '@modules/client/client.module';
import { ShopModule } from '@modules/shop/shop.module';
import { OrderModule } from '@modules/order/order.module';
import { ScheduleModule } from '@modules/schedule/schedule.module';
import { HealthModule } from '@modules/health/health.module';
import { TokenModule } from '@modules/token/token.module';
import { FileModule } from '@modules/file/file.module';

@Module({
  imports: [
    AddressModule,
    AuthModule,
    BankModule,
    ClientModule,
    CollaboratorModule,
    FileModule,
    HealthModule,
    NestConfigModule,
    NestI18nModule,
    NestJwtModule,
    NestPinoModule,
    OrderModule,
    OrmModule,
    PhoneModule,
    RoleModule,
    ScheduleModule,
    ShopModule,
    TokenModule,
    UserModule,
  ],
})
export class SharedModule {}
