import { Injectable, HttpStatus } from '@nestjs/common';
import { LoginDto } from "./dto";
import { HttpRes } from "../../common/help/http.response";

@Injectable()
export class UserService {
    public async login (loginDto: LoginDto): Promise<HttpRes> {
        if (loginDto.username === 'lixingwen') {
            return new HttpRes(
                HttpStatus.OK, 
                {username: 'lixingwen', age: 18}
            )
        }
        return new HttpRes(
            HttpStatus.FORBIDDEN, 
            {},
            "用户名错误"
        )
    }
}