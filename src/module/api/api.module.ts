import { ArticleService } from './article/article.service';
import { Module, Global, Header, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserService } from './user/user.service';

import { UserController } from './user/user.controller';
// import { UserProviders } from "./user/user.providers";
import { ArticleController } from './article/article.controller';
import { UploadController } from "./upload/upload.controller";
import { UploadService } from "./upload/upload.service";
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { ConfigService } from './config/config.service';
import { ConfigController } from './config/config.controller';

import { EventsGateway } from './socket/events.gateway'

@Module({
  controllers: [ UserController, ArticleController, UploadController, ConfigController],
  providers: [UserService, ArticleService, UploadService, ConfigService, EventsGateway],
  exports: [UserService]
})
export class ApiModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('user')
    }
}
