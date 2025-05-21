import { ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
  type: 'mssql',
  host: process.env.MSSQL_HOST || '127.0.0.1',
  port: Number(process.env.MSSQL_PORT) || 1433,
  username: process.env.MSSQL_USERNAME || 'sa',
  password: process.env.MSSQL_PASSWORD || 'yourStrong(!)Password',
  database: process.env.MSSQL_DATABASE || 'foodbear',
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

export { connectionOptions };
