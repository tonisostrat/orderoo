import { DataSourceOptions } from 'typeorm';

export type Config = {
  server: Config.Server;
  database: Config.Database;
};

export namespace Config {
  export type Server = {
    port: number;
  };
  export type Database = DataSourceOptions;
}

export const config = (): Config => ({
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    migrations: [`${process.cwd()}/migrations/*.js`],
    migrationsRun: true,
    logging: Boolean(process.env.DATABASE_LOGGING) || false,
  },
});
