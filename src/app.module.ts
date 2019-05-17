import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { CatsController } from './module/cats/cats.controller';
import { AuthModule } from './module/auth/auth.module';
import { DbModule } from "./common/db/db.module";
import { ConfigModule } from "./module/config/config.module";

@Module({
  imports: [ConfigModule, DbModule, AuthModule, UserModule],
  controllers: [CatsController],
  providers: [],
})
export class AppModule {}
