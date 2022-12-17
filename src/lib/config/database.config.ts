import 'dotenv/config';
import { Knex } from 'knex';
import { registerAs } from '@nestjs/config';

import { ValidateSchema } from '@lib/config/validate.config';

const environment = ValidateSchema.parse(process.env);

export const DatabaseConfig = {
  client: 'pg',
  connection: {
    host: environment.PG_HOST,
    port: environment.PG_PORT,
    user: environment.PG_USER,
    password: environment.PG_PASSWORD,
    database: environment.PG_DB,
    debug: environment.PG_DEBUG,
    ssl: environment.PG_SSL,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: `${process.cwd()}/src/database/migrations`,
  },
  seeds: {
    directory: `${process.cwd()}/src/database/seeds`,
  },
} as Knex.Config;

export const database = registerAs('database', () => DatabaseConfig);
