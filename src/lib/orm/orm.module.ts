import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Module } from '@nestjs/common';
import { Knex } from 'knex';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { BaseEntity } from '@common/entities/base.entity';

import { User } from '@modules/user/entities/user.entity';
import { Role } from '@modules/role/entities/role.entity';
import { UserRole } from '@modules/user/entities/user-role.entity';
import { Phone } from '@modules/phone/entities/phone.entity';
import { Address } from '@modules/address/entities/address.entity';
import { Collaborator } from '@modules/collaborator/entities/collaborator.entity';
import { PhoneCollaborator } from '@modules/phone/entities/phone.collaborator';
import { AddressCollaborator } from '@modules/address/entities/address-collaborator.entity';
import { Bank } from '@modules/bank/entities/bank.entity';

@Module({
  imports: [
    ObjectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          Model: BaseEntity,
          config: {
            ...config.get<Knex.Config>('database'),
          },
        };
      },
    }),
    ObjectionModule.forFeature([
      User,
      Role,
      UserRole,
      Phone,
      Address,
      Collaborator,
      PhoneCollaborator,
      AddressCollaborator,
      Bank,
    ]),
  ],
  exports: [ObjectionModule],
})
export class OrmModule {}
