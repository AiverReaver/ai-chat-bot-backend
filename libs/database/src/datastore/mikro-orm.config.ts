// import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { PostgreSqlOptions } from '@mikro-orm/postgresql/PostgreSqlMikroORM';
import * as dotenv from 'dotenv';
import { BaseEntityRepository } from '../repositories/base.repository';
import { entities } from '../entities';

dotenv.config();

export const dbConfig: PostgreSqlOptions = {
  allowGlobalContext: true,
  host: process.env.DB_HOST_NAME,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA_NAME,
  entities: [...entities],
  debug: process.env.NODE_ENV !== 'production',
  driver: PostgreSqlDriver,
  forceUtcTimezone: true,
  migrations: {
    path: 'libs/database/src/migrations',
    tableName: 'migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
  },
  entityRepository: BaseEntityRepository,
};

export default dbConfig;
