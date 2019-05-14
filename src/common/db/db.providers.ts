import { createConnection } from "typeorm";

export const dbProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async () => await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '123456',
            database: 'xinwentest',
            entities: [
                __dirname + '/../entity/**/*.entity{.ts,.js}',
            ],
            synchronize: true,
        }),
    },
];
