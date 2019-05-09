import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { LoginDto } from "./dto";
import { UserService } from './user.service'
import { Response } from "express";

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('/login')
    async login (@Body() loginDto: LoginDto, @Res() res: Response) {
        let result = await this.userService.login(loginDto)
        res.status(result.status).json(result)
    }
}
