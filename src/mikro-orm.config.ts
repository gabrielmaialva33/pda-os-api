import { Options } from '@mikro-orm/core';
import { Logger } from '@nestjs/common';
import { TSMigrationGenerator } from '@mikro-orm/migrations';

const logger = new Logger('MikroORM');

const MikroOrmConfig: Options = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  dbName: process.env.PG_DB || 'postgres',
  type: 'postgresql',
  debug: process.env.PG_DEBUG === 'true' || false,
  logger: logger.log.bind(logger),
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
};

export default MikroOrmConfig;
