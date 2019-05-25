import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { CommonModule } from "./common/common.module";
import { ConfigModule } from "./module/config/config.module";
import { ApiModule } from './module/api/api.module';

@Module({
  imports: [ConfigModule, CommonModule, AuthModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
