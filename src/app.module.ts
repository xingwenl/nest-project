import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './controller/user/user.service';
import { CatsController } from './controller/cats/cats.controller';
import { UserController } from './controller/user/user.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
