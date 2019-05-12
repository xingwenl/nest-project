import { Connection, Repository } from 'typeorm';
import { Userinfo } from "./user.entity";

export const UserProviders = [
    {
        provide: 'UserRepositoryInfo',
        useFactory: (connection: Connection) => connection.getRepository(Userinfo),
        inject: ['DbConnectionToken'],
    },
];