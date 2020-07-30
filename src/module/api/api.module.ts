import { PermissionsService } from './permissions/permissions.service';
import { PermissionsController } from './permissions/permissions.controller';
import { ArticleService } from './article/article.service';
import {
    Module,
    Global,
    Header,
    NestModule,
    MiddlewareConsumer,
    HttpModule,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
// import { UserProviders } from "./user/user.providers";
import { ArticleController } from './article/article.controller';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { LoggerMiddleware } from '../../common/middleware/logger.middleware';
import { ConfigService } from './config/config.service';
import { ConfigController } from './config/config.controller';
import { EventsGateway } from './socket/events.gateway';
import { StorageController } from './storage/storage.controller';
import { StorageService } from './storage/storage.service';
import { VersionController } from './version/version.controller';
import { VersionService } from './version/version.service';

@Module({
    imports: [HttpModule],
    controllers: [
        UserController,
        ArticleController,
        UploadController,
        ConfigController,
        StorageController,
        PermissionsController,
        VersionController,
    ],
    providers: [
        UserService,
        ArticleService,
        UploadService,
        ConfigService,
        EventsGateway,
        StorageService,
        PermissionsService,
        VersionService,
    ],
    exports: [UserService],
})
export class ApiModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('user');
    }
}
