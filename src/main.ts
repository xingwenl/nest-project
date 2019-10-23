import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { RolesGuard } from "./common/guard/roles.guard";
import { JwtAuthGuard } from "./common/guard/jwt-auth.guard";
// import { ValidationPipe, ValidationError} from "@nestjs/common";
import { CustomValidationPipe } from "./common/pipe/validation.pipe";
// import { CustomLogger } from './module/logger/logger';
import { ResponseInterceptor } from './common/interceptors/response';
import { Logger } from '@nestjs/common';
import { join } from 'path'
import * as cors from "cors";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CustomLogger } from './module/logger/logger';

import { WsAdapter } from '@nestjs/platform-ws';
// import { AbstractWsAdapter } from "@nestjs/websockets";

import { RedisIoAdapter } from "./common/adapter/redis.io.adapter";

function initSwagger(app) {
    // 接口文档
    const options = new DocumentBuilder()
        .setTitle('xingwen')
        .setDescription('xingwenceshi ')
        .setVersion('1.0')
        .addTag('user')
        .setBasePath('/api')
        .setHost('localhost:3000')
        .addBearerAuth() // 启用token验证
        .build()
        
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('doc', app, document);
    // http://localhost:3000/doc/api
    Logger.log(`Doc running on http://localhost:3000/doc/api`)
}







async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: false
  });
  app.useStaticAssets(join(__dirname, '..', 'static'), {
      prefix: '/static/'
  })
  app.use(cors({
    //   origin: 'http://localhost:3002',
      origin: '*',
      credentials: true
  }))

//   app.useLogger(app.get(CustomLogger))
  // app.useLogger(app.get(CustomLogger))
  app.setGlobalPrefix('api');
  // 异常处理
  app.useGlobalFilters(new HttpExceptionFilter());
  // 成功处理
  app.useGlobalInterceptors(new ResponseInterceptor())
  // 角色处理
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  // token验证处理
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  // app.useGlobalPipes(new ValidationPipe({
  //   transform: true,
  //   validationError: {
  //     target: false,
  //     value: false
  //   }
  // }))
  // 基础参数判断
  app.useGlobalPipes(new CustomValidationPipe())
  
//   app.useWebSocketAdapter(new RedisIoAdapter(app))
  initSwagger(app)
  
  await app.listen(3000);
  Logger.log(`Server running on http://localhost:3000`)
}
bootstrap();
