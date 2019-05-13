import { Controller, Post, Body, Res, HttpStatus, Get, HttpException, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { Roles } from "../../common/decorator/roles.decorator";
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { JwtAuth } from 'src/common/decorator/jwt-auth.decorator';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        const result = await this.userService.login(loginDto);
        return result
    }
    
    // @Roles('user')
//    @UseGuards(AuthGuard)
 
    @Get()
    @JwtAuth('121')
    async info() {
        return await this.userService.info()
    }
}
