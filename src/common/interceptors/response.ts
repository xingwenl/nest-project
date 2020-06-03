import { CustomLogger } from './../../module/logger/logger';
import { ApiErrorCode } from './../enums/api-error-code.enum';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { httpSuccess, httpRes } from '../help/http.response';

export interface Response<T> {
  data: T;
  code: number;
  message: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly logger: CustomLogger) {}
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map(data => httpSuccess(data)),
      // 服务器错误处理
      catchError((err: any) => {
        const req: Request = context.switchToHttp().getRequest();
        this.logger.error(
          `"${req.method} ${req.url}"\n`,
          `${req.headers['user-agent']}\n`,
          err,
        );
        return throwError(httpRes(ApiErrorCode.FAIL, err.toString()));
      }),
    );
    // return next.handle().map(data => ({ code: 200, data, message: 'success' }));
  }
}
