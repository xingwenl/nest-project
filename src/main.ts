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

import { join } from 'path'
import * as cors from "cors";
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static'), {
      prefix: '/static/'
  })
  app.use(cors({
    //   origin: 'http://localhost:3002',
      origin: '*',
      credentials: true
  }))
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
  

  // 接口文档
  /** 
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .setBasePath('/api')
    .setHost('localhost:3000')
    .build()
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  */
  
  await app.listen(3000);
}
bootstrap();
