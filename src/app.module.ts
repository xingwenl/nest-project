import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from './module/config/config.module';
import { ApiModule } from './module/api/api.module';
import { LoggerModule } from './module/logger/logger.module';
import { StatusMonitorModule } from 'nest-status-monitor';
import statusMonitorConfig from './config/statusMonitorConfig';
import { SystemModule } from './module/system/system.module'

@Module({
    imports: [
        StatusMonitorModule.setUp(statusMonitorConfig),
        ConfigModule,
        LoggerModule,
        CommonModule,
        AuthModule,
        ApiModule,
        SystemModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
