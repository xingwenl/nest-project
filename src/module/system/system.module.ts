import { PerformanceService } from './performance/performance.service';
import { PerformanceController } from './performance/performance.controller';

import { AppService } from './app/app.service';
import { AppController } from './app/app.controller';

import { LoggerMiddleware } from '../../common/middleware/logger.middleware';
import {
    Module,
    Global,
    Header,
    NestModule,
    MiddlewareConsumer,
    HttpModule,
} from '@nestjs/common';


@Module({
    controllers: [
      PerformanceController,
      AppController,
    ],
    providers: [
      PerformanceService,
      AppService,
    ],
    exports: [],
})
export class SystemModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('/');
    }
}
