import { ArgumentsHost, Catch, ExceptionFilter, HttpException, ValidationError } from "@nestjs/common";
import { ApiException } from "../exception/api.exception";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        if (exception instanceof ApiException) {
            response
                .status(200)
                .json({
                    code: exception.getErrorCode(),
                    message: exception.getErrorMessage(),
                    date: new Date().toLocaleDateString(),
                    path: request.url,
                    data: exception.getErrorData()
                })
        }
        else {
            response
            .status(200)
            .json({
                code: status,
                date: new Date().toLocaleDateString(),
                path: request.url,
                message: exception.message
            })
        }
    }
}