import { Connection, Repository } from 'typeorm';
import { Userinfo } from '../../../common/entities/user/user-info.entity';
import { UserRecord } from '../../../common/entities/user/user-record.entity';

export const UserProviders = [
  {
    provide: 'UserRepositoryInfo',
    useFactory: (connection: Connection) => connection.getRepository(Userinfo),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'UserRecord',
    useFactory: (connection: Connection) =>
      connection.getRepository(UserRecord),
    inject: ['DbConnectionToken'],
  },
];
