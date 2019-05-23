import { ArticleService } from './article/article.service';
import { Module, Global } from '@nestjs/common';
import { UserService } from './user/user.service';

import { UserController } from './user/user.controller';
// import { UserProviders } from "./user/user.providers";
import { ArticleController } from './article/article.controller';

@Module({
  controllers: [ UserController, ArticleController],
  providers: [UserService, ArticleService],
  exports: [UserService]
})
export class ApiModule {}
