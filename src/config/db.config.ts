import { registerAs } from "@nestjs/config";

export const dbConfiguration = registerAs('database', () => {
    return {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'shop',
        entities: ["dist/**/**.entity{.ts,.js}"],
        logging: true,
        migrations: ["dist/migration/*.{.ts,js}"],
        cli: {
            migrationsDir: 'src/migrations'
        },
    }
})