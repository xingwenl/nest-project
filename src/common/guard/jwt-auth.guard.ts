import {
    ExecutionContext,
    Injectable
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { httpRes, ApiErrorCode } from '../help/http.response';
import { Reflector } from "@nestjs/core";
  
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly ref: Reflector){
        super()
    }

    canActivate(context: ExecutionContext) {
        // add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        const jwt = this.ref.get('jwt', context.getHandler())
        if (jwt) {
            return super.canActivate(context);
        }
        return true
    }

    // 这边是最开始判断token是否正确 ， 正确才会向下传， 拦截一下， 返回个正常的错误吗
    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            throw httpRes(ApiErrorCode.TOKEN_INVALID, 'token无效')
        }
        return user;
    }
}