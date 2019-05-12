import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './controller/user/user.module';
import { CatsController } from './controller/cats/cats.controller';
import { DbModule } from "./common/db/db.module";

@Module({
  imports: [DbModule, UserModule],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
