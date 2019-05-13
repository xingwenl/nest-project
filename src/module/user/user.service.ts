import { Injectable, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { Repository } from "typeorm";
import { LoginDto, RegisterDto } from './dto';
import { httpRes, ApiResponse, ApiException, ApiErrorCode } from '../../common/help/http.response';
// import { UserProviders } from "../../common/entities/user.providers";
import { Userinfo } from "../../common/entity/user/user-info.entity";
import { AuthService } from '../auth/auth.service';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Injectable()
export class UserService  {

    constructor(
        @Inject('UserRepositoryInfo')
        private readonly userRepository: Repository<Userinfo>,
        @Inject(forwardRef(() => UserService))
        private readonly authService: AuthService
    ){
    }

    public async info(): Promise<ApiResponse|ApiException> {
        let res = await this.userRepository.find()
        return httpRes(
                ApiErrorCode.SUCCESS,
                "请求成功",
                res
            )
    }
    
    public async sign(payload: JwtPayload) {
        return this.userRepository.findOne(payload)
    }

    public async login(loginDto: LoginDto): Promise<ApiResponse|ApiException> {
        // let res = await this.userRepository.find()
        // return new HttpRes(
        //     HttpStatus.OK,
        //     res,
        // );
        if (loginDto.username === 'lixingwen') {
            const token = await this.authService.createToken({username: loginDto.username})
            return httpRes(
                ApiErrorCode.SUCCESS,
                "请求成功",
                {username: 'lixingwen', age: 18, token}
            )
        }
        return httpRes(
            ApiErrorCode.USER_NOTFUND,
            '用户名错误',
        );
    }

    public async register(registerDto: RegisterDto) {
        return await this.userRepository.save(registerDto)
    }
}
