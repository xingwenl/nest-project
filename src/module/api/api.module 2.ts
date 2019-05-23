import { Article } from './article/article.controller';
import { Module, Global } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
// import { UserProviders } from "./user/user.providers";

@Module({
  controllers: [ UserController, Article],
  providers: [UserService],
  exports: [UserService]
})
export class ApiModule {}
