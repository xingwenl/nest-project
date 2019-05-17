import { createConnection } from "typeorm";
import { ConfigService } from "../../module/config/config.service";

const config = new ConfigService();
console.log('配置', config)

export const dbProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async () => await createConnection({
            type: "mysql",
            host: config.dbHost,
            port: config.dbPort,
            username: config.dbUsername,
            password: config.dbPassword,
            database: config.dbDatabase,
            entities: [
                __dirname + '/../entity/**/*.entity{.ts,.js}',
            ],
            synchronize: true,
        }),
    },
];
