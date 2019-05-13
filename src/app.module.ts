import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { CatsController } from './module/cats/cats.controller';
import { AuthModule } from './module/auth/auth.module';
import { DbModule } from "./common/db/db.module";

@Module({
  imports: [DbModule, UserModule, AuthModule],
  controllers: [AppController, CatsController],
  providers: [AppService],
  exports: [UserModule]
})
export class AppModule {}
