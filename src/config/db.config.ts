import { registerAs } from "@nestjs/config";
import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm";
import { dbCredentials } from "./db";

const dbInfo = {
    ...dbCredentials,
    entities: ["dist/**/**.entity{.ts,.js}"],
    logging: true,
    migrations: ["dist/migration/*.{.ts,js}"],
    cli: {
        migrationsDir: 'src/migrations'
    },
};

export const dbConfiguration = registerAs('database', () => {
    return dbInfo;
});

export default new DataSource(dbInfo as DataSourceOptions);
