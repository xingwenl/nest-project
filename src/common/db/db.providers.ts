import { createConnection } from 'typeorm';
import { ConfigService } from '../../module/config/config.service';

const config = new ConfigService();

export const dbProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: config.dbHost,
        port: config.dbPort,
        username: config.dbUsername,
        password: config.dbPassword,
        database: config.dbDatabase,
        entities: [__dirname + '/../entities/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
