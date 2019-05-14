import { Controller, Post, Body, Res, HttpStatus, Get, HttpException, UseGuards, ValidationPipe, Request, Req } from '@nestjs/common';
import { LoginDto, RegisterDto, EditDto } from './dto';
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

    /**
     * 
     * @api {Post} /login 登陆
     * @apiName 登陆
     * @apiGroup User
     * @apiVersion  1.0.0
     * 
     * @apiParam  {String} username 用户名
     * @apiParam  {String} passowrd 密码
     * @apiSampleRequest http://localhost:3000/api/user/login
     * 
     * @apiSuccess (200) {Number} code 状态码
     * 
     * @apiParamExample  {Object} Request-Example:
     * {
     *     username : lixingwen
     *     passowrd: 123456
     * }
     * 
     * 
     * @apiSuccessExample {Object} Success-Response:
     * {
     *     code : 0
     *     data: {},
     *     message: '成功'
     * }
     * 
     * 
     */
    @Post('/register')
    async register(@Body() registerDto: RegisterDto) {
        return await this.userService.register(registerDto)
    }
    
    // @Roles('user')
//    @UseGuards(AuthGuard)
 
    @Get()
    @JwtAuth()
    async info( @Req() req) {
        return await this.userService.info(req)
    }

    @Post('/edit')
    @JwtAuth()
    async edit(@Body() editDto: EditDto, @Req() req: Request) {
        return await this.userService.edit(editDto, req)
    }
    
}
