import { createConnection } from "typeorm";

export const dbProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async () => await createConnection({
            type: 'mysql',
            host: '',
            port: 3306,
            username: 'root',
            password: '',
            database: '',
            entities: [
                __dirname + '/../*.entity{.ts,.js}',
            ],
            synchronize: true,
        })
    }
]