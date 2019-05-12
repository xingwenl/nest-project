import { Controller, Post, Body, Res, HttpStatus, Get, HttpException } from '@nestjs/common';
import { LoginDto } from './dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { Roles } from "../../common/decorator/roles.decorator";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        const result = await this.userService.login(loginDto);
        return result
    }

    @Get()
    @Roles('user')
    async info() {
        return await this.userService.info()
    }
}
