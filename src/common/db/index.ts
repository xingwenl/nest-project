import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../../module/config/config.service';
export const DbModule = TypeOrmModule.forRootAsync({
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: configService.dbHost,
      port: configService.dbPort,
      username: configService.dbUsername,
      password: configService.dbPassword,
      database: configService.dbDatabase,
      // entities: [__dirname + '/../entities/**/*.entity{.ts,.js}'],
      synchronize: true,
      charset: 'utf8mb4',
      autoLoadEntities: true,
      cache: {
        // 缓存时间 10s
        duration: configService.dbDuration,
      },
    };
  },
  inject: [ConfigService],
});
