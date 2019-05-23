import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { httpSuccess } from "../help/http.response";

export interface Response<T> {
    data: T;
    code: number;
    message: string;
}

@Injectable()
export class ResponseInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<any> {
        return next.handle().pipe(
            map(data => (httpSuccess(data)))
        )
        // return next.handle().map(data => ({ code: 200, data, message: 'success' }));
    }
}