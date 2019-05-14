import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { RolesGuard } from "./common/guard/roles.guard";
import { JwtAuthGuard } from "./common/guard/jwt-auth.guard";
import { ValidationPipe, ValidationError} from "@nestjs/common";
import { CustomValidationPipe } from "./common/pipe/validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  await app.listen(3000);
}
bootstrap();
