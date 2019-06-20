import { ArticleService } from './article/article.service';
import { Module, Global, Header } from '@nestjs/common';
import { UserService } from './user/user.service';

import { UserController } from './user/user.controller';
// import { UserProviders } from "./user/user.providers";
import { ArticleController } from './article/article.controller';
import { UploadController } from "./upload/upload.controller";
import { UploadService } from "./upload/upload.service";

@Module({
  controllers: [ UserController, ArticleController, UploadController],
  providers: [UserService, ArticleService, UploadService],
  exports: [UserService]
})
export class ApiModule {}
