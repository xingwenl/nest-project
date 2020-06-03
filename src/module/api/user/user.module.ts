import { Module, Global } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProviders } from './user.providers';

@Global()
@Module({
  controllers: [UserController],
  providers: [...UserProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
