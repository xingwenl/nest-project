import { Controller, Post, Body, Res, HttpStatus, Get, HttpException, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { Roles } from "../../common/decorator/roles.decorator";
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { JwtAuth } from 'src/common/decorator/jwt-auth.decorator';
import { CustomValidationPipe } from 'src/common/pipe/validation.pipe';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        return await this.userService.login(loginDto);
    }

    @Post('/register')
    async register(@Body() registerDto: RegisterDto) {
        return await this.userService.register(registerDto)
    }
    
    // @Roles('user')
//    @UseGuards(AuthGuard)
 
    @Get()
    @JwtAuth()
    async info() {
        return await this.userService.info()
    }
    
}
