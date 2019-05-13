import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProviders } from "./user.providers";


@Module({
  controllers: [ UserController],
  providers: [...UserProviders, UserService],
})
export class UserModule {}
