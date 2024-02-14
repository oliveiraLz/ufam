import { envs } from "../common/env-values";
import { DataSource } from "typeorm";

export const databaseProviders = [
  {
    provide: "DATA_SOURCE",
    useFactory: async () => {
      return new DataSource({
        type: "postgres",
        host: envs.DATABASE_HOST,
        port: envs.DATABASE_PORT,
        username: envs.DATABASE_USER,
        password: envs.DATABASE_PASSWORD,
        database: envs.DATABASE_NAME,
        entities: [__dirname + "/../**/*.entity.{js,ts}"],
        migrationsTableName: "migrations",
        migrations: ["dist/**/database/migrations/*{.ts,.js}"],
        migrationsRun: true,
        migrationsTransactionMode: "all",
        synchronize: false,
        logging: false,
      }).initialize();
    },
  },
];
