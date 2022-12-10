import { defineConfig, ReflectMetadataProvider } from '@mikro-orm/core';
import { Logger } from '@nestjs/common';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
//import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const logger = new Logger('MikroORM-CLI');

logger.log(`🛠️  Using env ${process.cwd()}/env/.env.${process.env.NODE_ENV}\n`);

export default defineConfig<PostgreSqlDriver>({
  driver: PostgreSqlDriver,
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT) || 5432,
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  dbName: process.env.PG_DB || 'pda_app_development',
  debug: process.env.PG_DEBUG === 'true' || false,
  driverOptions: {
    connection: { ssl: process.env.PG_SSL === 'true' || false },
  },
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  filters: {
    deleted: {
      cond: { deleted_at: { $eq: null } },
    },
  },
  logger: logger.log.bind(logger),
  highlighter: new SqlHighlighter(),
  metadataProvider: ReflectMetadataProvider,
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: 'dist/src/common/database/migrations',
    pathTs: 'src/common/database/migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    emit: 'ts',
    generator: TSMigrationGenerator,
    fileName: (timestamp: string) => `migration_${timestamp}`,
  },
  seeder: {
    path: 'dist/src/common/database/seeds',
    pathTs: 'src/common/database/seeds',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) =>
      className.toLowerCase().replace(/seeder$/, '.') + 'seeder',
  },
});
