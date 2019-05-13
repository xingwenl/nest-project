import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { RolesGuard } from "./common/guard/roles.guard";
// import { JwtAuthGuard } from "./common/guard/jwt-auth.guard";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  // app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  await app.listen(3000);
}
bootstrap();
