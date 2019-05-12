import { createConnection } from "typeorm";

console.log(__dirname)
export const dbProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async () => await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'xinwentest',
            entities: [
                __dirname + '/../../controller/**/*.entity{.ts,.js}',
            ],
            synchronize: true,
        }),
    },
];
