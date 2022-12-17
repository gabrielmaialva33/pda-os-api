import { Module } from '@nestjs/common';
import { OrmModule } from '@lib/orm/orm.module';

import { CollaboratorController } from '@modules/collaborator/controllers/collaborator.controller';
import { CollaboratorService } from '@modules/collaborator/services/collaborator.service';
import { CollaboratorRepository } from '@modules/collaborator/repositories/collaborator.repository';

import { UserModule } from '@modules/user/user.module';
import { RoleModule } from '@modules/role/role.module';
import { PhoneModule } from '@modules/phone/phone.module';
import { AddressModule } from '@modules/address/address.module';
import { BankModule } from '@modules/bank/bank.module';

@Module({
  imports: [
    OrmModule,
    UserModule,
    RoleModule,
    PhoneModule,
    AddressModule,
    BankModule,
  ],
  controllers: [CollaboratorController],
  providers: [CollaboratorService, CollaboratorRepository],
  exports: [CollaboratorService],
})
export class CollaboratorModule {}
