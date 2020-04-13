import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { CommonModule } from "./common/common.module";
import { ConfigModule } from "./module/config/config.module";
import { ApiModule } from './module/api/api.module';
import { LoggerModule } from './module/logger/logger.module';

@Module({
  imports: [ConfigModule, LoggerModule, CommonModule, AuthModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
