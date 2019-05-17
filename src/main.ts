import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { RolesGuard } from "./common/guard/roles.guard";
import { JwtAuthGuard } from "./common/guard/jwt-auth.guard";
import { ValidationPipe, ValidationError} from "@nestjs/common";
import { CustomValidationPipe } from "./common/pipe/validation.pipe";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  // app.useGlobalPipes(new ValidationPipe({
  //   transform: true,
  //   validationError: {
  //     target: false,
  //     value: false
  //   }
  // }))
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
