import {
  LoadStrategy,
  UnderscoreNamingStrategy,
  ReflectMetadataProvider,
} from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Logger, Module } from '@nestjs/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
//import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

import { UserEntity } from '@user/entities/user.entity';
import { UserRoleEntity } from '@user/entities/user-role.entity';
import { RoleEntity } from '@role/entities/role.entity';
import { LoggerEntity } from '@logger/entities/logger.entity';
import { BaseRepository } from '@common/repositories/base.repository';
import { CollaboratorEntity } from '@collaborator/entities/collaborator.entity';
import { PhoneEntity } from '@phone/entities/phone.entity';
import { PhoneCollaboratorEntity } from '@phone/entities/phone-collaborator.entity';
import { AddressEntity } from '@address/entities/address.entity';
import { AddressCollaboratorEntity } from '@address/entities/address-collaborator.entity';

const logger = new Logger('MikroORM');

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgresql',
        host: configService.get('database.host'),
        port: configService.get<number>('database.port'),
        password: configService.get('database.password'),
        user: configService.get('database.username'),
        dbName: configService.get('database.dbName'),
        driverOptions: {
          connection: {
            ssl: configService.get('database.ssl') || false,
          },
        },
        entities: ['dist/**/*.entity.js'],
        entitiesTs: ['src/**/*.entity.ts'],
        debug: configService.get('database.debug') || true,
        loadStrategy: LoadStrategy.JOINED,
        highlighter: new SqlHighlighter(),
        metadataProvider: ReflectMetadataProvider,
        entityRepository: BaseRepository,
        allowGlobalContext: true,
        registerRequestContext: false,
        pool: { min: 2, max: 10 },
        logger: logger.log.bind(logger),
        namingStrategy: UnderscoreNamingStrategy,
        filters: {
          deleted: {
            cond: { deleted_at: { $eq: null } },
          },
        },
        migrations: {
          tableName: 'mikro_orm_migrations',
          path: 'dist/src/database/migrations',
          pathTs: 'src/database/migrations',
          glob: '!(*.d).{js,ts}',
          transactional: true,
          emit: 'ts',
          generator: TSMigrationGenerator,
          fileName: (timestamp: string) => `migration.${timestamp}`,
        },
        seeder: {
          path: 'dist/src/database/seeds',
          pathTs: 'src/database/seeds',
          defaultSeeder: 'DatabaseSeeder',
          glob: '!(*.d).{js,ts}',
          emit: 'ts',
          fileName: (className: string) =>
            className.toLowerCase().replace(/seeder$/, '.') + 'seeder',
        },
      }),
    }),
    MikroOrmModule.forFeature({
      entities: [
        ...Object.values([
          UserEntity,
          RoleEntity,
          UserRoleEntity,
          LoggerEntity,
          CollaboratorEntity,
          PhoneEntity,
          PhoneCollaboratorEntity,
          AddressEntity,
          AddressCollaboratorEntity,
        ]),
      ],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
