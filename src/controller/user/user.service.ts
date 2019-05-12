import { Injectable, HttpStatus, Inject } from '@nestjs/common';
import { Repository } from "typeorm";
import { LoginDto } from './dto';
import { httpRes, ApiResponse, ApiException, ApiErrorCode } from '../../common/help/http.response';
// import { UserProviders } from "../../common/entities/user.providers";
import { Userinfo } from "./user.entity";
// import { ApiException, ApiErrorCode } from "../../common/exception/api.exception";

@Injectable()
export class UserService  {

    constructor(
        @Inject('UserRepositoryInfo')
        private readonly userRepository: Repository<Userinfo>
    ){
    }

    public async info(): Promise<ApiResponse|ApiException> {
        let res = await this.userRepository.find()
        // throw new ApiException(ApiErrorCode.USER_NOTFUND, "请求成功")
        return httpRes(
                ApiErrorCode.SUCCESS,
                "请求成功",
                res
            )
    }

    public async login(loginDto: LoginDto): Promise<ApiResponse|ApiException> {
        // let res = await this.userRepository.find()
        // return new HttpRes(
        //     HttpStatus.OK,
        //     res,
        // );
        if (loginDto.username === 'lixingwen') {
            return httpRes(
                ApiErrorCode.SUCCESS,
                "请求成功",
                {username: 'lixingwen', age: 18}
            )
        }
        return httpRes(
            ApiErrorCode.USER_NOTFUND,
            '用户名错误',
        );
    }
}
