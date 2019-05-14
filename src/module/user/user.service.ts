import { Injectable, HttpStatus, Inject, forwardRef, Request } from '@nestjs/common';
import { Repository } from "typeorm";
import { LoginDto, RegisterDto, EditDto } from './dto';
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
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ){
    }

    public async info(req: any): Promise<ApiResponse|ApiException> {
        let res = req.user
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
        const user = await this.userRepository.findOne(loginDto)
        console.log(user)
        if (user) {
            const token = await this.authService.createToken({username: loginDto.username})
            return httpRes(
                ApiErrorCode.SUCCESS,
                "请求成功",
                {...user, token}
            )
        }
        httpRes(
            ApiErrorCode.USER_NOTFUND,
            '帐号或密码错误',
        );
    }

    

    public async register(registerDto: RegisterDto) {
        const user = await this.sign({username: registerDto.username})
        if (user) {
            httpRes(
                ApiErrorCode.USER_HAVED,
                '用户已存在',
            )
        }
        const res = await this.userRepository.insert(registerDto)
        return httpRes(
            ApiErrorCode.SUCCESS,
            '成功',
            {}
        )
    }

    public async edit(editDto: EditDto, req: any) {
        if (req.user) {
            const user = await this.userRepository.update({id: req.user.id}, {
                age: editDto.age
            })
            if (user) {
                return httpRes(
                    ApiErrorCode.SUCCESS,
                    '成功',
                    {}
                )
            }
        }
        return httpRes(
            ApiErrorCode.SUCCESS,
            '失败',
            req.user
        )
    }
}
