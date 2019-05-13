import {
    ExecutionContext,
    UnauthorizedException,
    Injectable
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { httpRes, ApiErrorCode } from '../help/http.response';
  
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }

    // 这边是最开始判断token是否正确 ， 正确才会向下传， 拦截一下， 返回个正常的错误吗
    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            throw httpRes(ApiErrorCode.TOKEN_INVALID, 'token无效')
        }
        return user;
    }
}