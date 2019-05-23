import { Module, Global } from '@nestjs/common';
// import { DbModule } from "./db/db.module";
import { Userinfo } from "./entities/user/user-info.entity";
import { UserRecord } from "./entities/user/user-record.entity";
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { ConfigModule } from 'src/module/config/config.module';
import { ConfigService } from 'src/module/config/config.service';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
                return {
                    type: "mysql",
                    host: configService.dbHost,
                    port: configService.dbPort,
                    username: configService.dbUsername,
                    password: configService.dbPassword,
                    database: configService.dbDatabase,
                    entities: [
                        __dirname + '/./entities/**/*.entity{.ts,.js}',
                    ],
                    synchronize: true,
                }
            },
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([
            Userinfo,
            UserRecord
        ])
    ],
    controllers: [ ],
    providers: [],
    exports: []
})
export class CommonModule {}
